import axios from "axios";
import { getServerSession } from "next-auth/next";
import { getSession, signOut } from "next-auth/react";
import authOptions from "./auth";
import { redirect } from "next/navigation";

// Create a custom Axios instance
const Axios = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

// Add a request interceptor to include the token
Axios.interceptors.request.use(
   async (config) => {
      let session;
      const isServer = typeof window === "undefined";

      session = session = isServer
         ? await getServerSession(authOptions)
         : await getSession();

      console.log("Session:", session); // Debugging

      if (session?.accessToken) {
         config.headers.Authorization = `Bearer ${session.accessToken}`;
      } else {
         console.warn("No access token found in session");
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

Axios.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
         // Option 1: If you're using NextAuth
         signOut();

         // Option 2: If you're managing manually (clear localStorage, redirect)
         localStorage.removeItem("token");
         redirect("/signin");
      }
      return Promise.reject(error);
   }
);

export default Axios;
