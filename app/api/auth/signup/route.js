import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 })
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Create user
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    })

    return new Response(JSON.stringify({ message: "User created", user: { id: newUser.id, email: newUser.email } }), { status: 201 })

  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 })
  }
}
