import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Axios from "./Axios";


const authOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            try {
               const res = await Axios.post("/api/v1/users/login", {
                  email: credentials.email,
                  password: credentials.password,
               });

               if (res.data && res.data.accessToken) {
                  // Attach accessToken to user object for use in callbacks
                  return {
                     id: res.data.user.id,
                     name: res.data.user.name,
                     email: res.data.user.email,
                     role: res.data.user.role,
                     accessToken: res.data.accessToken,
                  };
               }

               return null;
            } catch (error) {
               throw new Error("Invalid email or password");
            }
         },
      }),
   ],

   callbacks: {
      async signIn({ user, account }) {
         if (account.provider === "google") {
            try {
               // Save Google user to Express API
               const res = await Axios.post(`/api/v1/users/google-login`, {
                  username: user.name,
                  email: user.email,
                  image: user.image,
                  provider: "google",
               });
               // Update user ID from database
               if (res.data && res.data.accessToken) {
                  return {
                     accessToken: res.data.accessToken,
                     user: res.data.user,
                  };
               }
            } catch (error) {
               console.error(
                  "Error saving Google user:",
                  error.response?.data || error.message
               );
               return false;
            }
         }
         return true;
      },

      async jwt({ token, user }) {
         token.accessToken = user.accessToken;
         return { ...token, ...user };
      },
      async session({ session, token }) {
         session.user = token;
         return session;
      },
   },
   

   secret: process.env.NEXTAUTH_SECRET,
   debug: process.env.NODE_ENV === "development",
   pages: {
      signIn: "/signin",
      error: "/error",
      newUser: "/signup",
   },
};

export default authOptions;
