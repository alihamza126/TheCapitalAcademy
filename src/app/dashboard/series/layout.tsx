
import React from "react"

export default function TestLayout({ children }: { children: React.ReactNode }) {


 
  return (
    <div className=" flex flex-col">
      {children}
    </div>
  )
}
