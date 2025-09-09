"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage("✅ User created! Now go to Login.")
      } else {
        setMessage("❌ " + data.error)
      }
    } catch (err) {
      setMessage("❌ Something went wrong")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  )
}
