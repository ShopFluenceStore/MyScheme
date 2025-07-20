import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../../../lib/db";
import User from "../../../../../lib/models/User";
import { verifyPassword } from "../../../../../lib/utils/auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          await dbConnect();

          const user = await User.findOne({ 
            email: credentials.email.toLowerCase(),
            isActive: true 
          });
          
          if (!user) {
            return null;
          }

          const isValid = await verifyPassword(credentials.password, user.password);
          if (!isValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.avatar
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          
          const existingUser = await User.findOne({ 
            email: user.email?.toLowerCase() 
          });
          
          if (!existingUser) {
            // Create new user from Google OAuth
            await User.create({
              name: user.name,
              email: user.email?.toLowerCase(),
              password: "", // No password for OAuth users
              role: "user",
              avatar: user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || '')}&background=16a34a&color=fff`,
              isActive: true
            });
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      
      // For Google OAuth, get user data from database
      if (account?.provider === "google" && user.email) {
        try {
          await dbConnect();
          const dbUser = await User.findOne({ 
            email: user.email.toLowerCase() 
          });
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.role = dbUser.role;
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      // Always redirect to home page after successful auth
      if (url.startsWith("/api/auth/")) {
        return baseUrl;
      }
      // Allow relative callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Allow callback URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    }
  },
  
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };