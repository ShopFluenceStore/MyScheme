// import dbConnect from "../../../../../lib/db";
// import User from "../../../../../lib/models/Users";
// import bcrypt from "bcrypt";

// // Check required environment variables
// if (!process.env.NEXTAUTH_SECRET || !process.env.MONGODB_URI) {
//   throw new Error('Missing required environment variables');
// }

// const authOptions = {
//   providers: [
//     {
//       id: 'credentials',
//       name: 'Credentials',
//       credentials: {
//         name: { label: "Name", type: "text", optional: true },
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         try {
//           if (!credentials?.email || !credentials?.password) {
//             throw new Error('Email and password are required');
//           }

//           await dbConnect();
          
//           // Handle sign up
//           if (credentials.name) {
//             const existingUser = await User.findOne({ email: credentials.email });
//             if (existingUser) throw new Error('User already exists');

//             const hashedPassword = await bcrypt.hash(credentials.password, 10);
//             const user = await User.create({
//               name: credentials.name,
//               email: credentials.email,
//               password: hashedPassword,
//               isAdmin: false
//             });

//             return {
//               id: user._id.toString(),
//               email: user.email,
//               name: user.name,
//               isAdmin: user.isAdmin
//             };
//           } 
//           // Handle sign in
//           else {
//             const user = await User.findOne({ email: credentials.email });
//             if (!user) throw new Error('No user found');

//             const isValid = await bcrypt.compare(credentials.password, user.password);
//             if (!isValid) throw new Error('Invalid password');

//             return {
//               id: user._id.toString(),
//               email: user.email,
//               name: user.name,
//               isAdmin: user.isAdmin
//             };
//           }
//         } catch (error) {
//           console.error('Auth error:', error.message);
//           throw new Error(error.message || 'Authentication failed');
//         }
//       }
//     }
//   ],
  
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60 // 30 days
//   },
  
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET
//   },
  
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE_ENV === 'development',
  
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.isAdmin = user.isAdmin;
//       }
//       return token;
//     },
    
//     async session({ session, token }) {
//       if (session?.user) {
//         session.user.id = token.id;
//         session.user.isAdmin = token.isAdmin;
//       }
//       return session;
//     },
    
//     async signIn() {
//       return true;
//     },
    
//     async redirect() {
//       // Always redirect to home page after login/signup
//       return '/';
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.isAdmin = token.isAdmin;
//       return session;
//     }
//   },
  
//   events: {
//     async error(error) {
//       console.error('Auth error:', error);
//     }
//   }
// };

// export default authOptions;
