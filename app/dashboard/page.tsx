"use client"

import { signOut, useSession } from "next-auth/react"

export default function DashboardPage() {
  const { data: session } = useSession()

  if (!session) {
    return <p className="text-center mt-10">❌ You must login first</p>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.email}</h1>
      <button
        onClick={() => signOut()}
        className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  )
}
