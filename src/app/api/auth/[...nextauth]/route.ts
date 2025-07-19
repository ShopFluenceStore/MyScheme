@@ .. @@
-// import NextAuth from "next-auth";
-// import authOptions from "./config";
-
-// const handler = NextAuth(authOptions);
-
-// export { handler as GET, handler as POST };
-// export { authOptions };
-
-
 import NextAuth from "next-auth";
 import CredentialsProvider from "next-auth/providers/credentials";
-import dbConnect from "../../../../../lib/db";
import User from "../../../../../lib/models/Users";
import bcrypt from "bcryptjs";
-import bcrypt from "bcrypt";
+import dbConnect from "../../../../../lib/db";
+import User from "../../../../../lib/models/User";
+import { verifyPassword } from "../../../../../lib/utils/auth";
+import { validateRequest, loginSchema } from "../../../../../lib/utils/validation";

 const handler = NextAuth({
   providers: [
     CredentialsProvider({
       name: "Credentials",
       credentials: {
         email: { label: "Email", type: "text" },
         password: { label: "Password", type: "password" },
       },
       async authorize(credentials) {
+        try {
+          if (!credentials?.email || !credentials?.password) {
+            throw new Error("Email and password are required");
+          }
+
+          // Validate input
+          const validation = validateRequest(loginSchema, credentials);
+          if (!validation.success) {
+            throw new Error(validation.error);
+          }
+
-        await dbConnect();
+          await dbConnect();

-        const user = await User.findOne({ email: credentials?.email });
-        if (!user) throw new Error("No user found");
+          const user = await User.findOne({ 
+            email: credentials.email.toLowerCase(),
+            isActive: true 
+          });
+          
+          if (!user) {
+            throw new Error("Invalid credentials");
+          }

-        const isValid = await bcrypt.compare(credentials.password, user.password);
-        if (!isValid) throw new Error("Invalid password");
+          const isValid = await verifyPassword(credentials.password, user.password);
+          if (!isValid) {
+            throw new Error("Invalid credentials");
+          }

-        return {
-          id: user._id.toString(),
-          email: user.email,
-          name: user.name,
-          isAdmin: user.isAdmin,
-        };
+          return {
+            id: user._id.toString(),
+            email: user.email,
+            name: user.name,
+            role: user.role,
+            avatar: user.avatar
+          };
+        } catch (error) {
+          console.error("Auth error:", error);
+          throw new Error(error instanceof Error ? error.message : "Authentication failed");
+        }
       },
     }),
   ],
   callbacks: {
     async jwt({ token, user }) {
       if (user) {
         token.id = user.id;
-        token.isAdmin = user.isAdmin;
+        token.role = user.role;
+        token.avatar = user.avatar;
       }
       return token;
     },
     async session({ session, token }) {
       return {
         ...session,
         user: {
           ...session.user,
           id: token.id,
-          isAdmin: token.isAdmin,
+          role: token.role,
+          avatar: token.avatar
         },
       };
     },
   },
+  events: {
+    async signIn({ user, account, profile }) {
+      console.log(`User ${user.email} signed in`);
+    },
+    async signOut({ session, token }) {
+      console.log(`User signed out`);
+    }
+  },
   pages: {
     signIn: "/signin",
+    error: "/auth/error"
   },
   session: {
     strategy: "jwt",
+    maxAge: 30 * 24 * 60 * 60, // 30 days
   },
   secret: process.env.NEXTAUTH_SECRET,
 });

 export { handler as GET, handler as POST };