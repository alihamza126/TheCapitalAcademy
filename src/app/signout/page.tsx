// pages/signout.tsx
"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";


export default function SignOutPage() {
  useEffect(() => {
    toast.loading("Signing you out Signin again ...", { duration: 5000 });
    signOut({ callbackUrl: "/signout" }); // redirect after signout
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium">Signing you out...</p>
    </div>
  );
}
