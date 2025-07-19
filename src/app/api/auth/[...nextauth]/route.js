// // import NextAuth from "next-auth";
// // import authOptions from "./config";

// // const handler = NextAuth(authOptions);

// // export { handler as GET, handler as POST };
// // export { authOptions };


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "../../../../../lib/db";
// import User from "../../../../../lib/models/Users";
// import bcrypt from "bcryptjs";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await dbConnect();

//         const user = await User.findOne({ email: credentials?.email });
//         if (!user) throw new Error("No user found");

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) throw new Error("Invalid password");

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//           isAdmin: user.isAdmin,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.isAdmin = user.isAdmin;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           isAdmin: token.isAdmin,
//         },
//       };
//     },
//   },
//   pages: {
//     signIn: "/signin",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };
