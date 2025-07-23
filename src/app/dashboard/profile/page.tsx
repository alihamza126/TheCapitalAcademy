"use client"

import UserUpdateForm from "@/components/dashboard/user-update-form"
import { useSession } from "next-auth/react"

interface PageProps {
  params: {
    id: string
  }
}

export default function Page() {

  return (
    <div className=" mx-auto py-8">
      <UserUpdateForm />
    </div>
  )
}
