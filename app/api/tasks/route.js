import { prisma } from "@/lib/prisma" // we'll create this prisma client file
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(req) {
  const session = await getServerSession(authOptions)
  if (!session) return new Response("Unauthorized", { status: 401 })

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return new Response(JSON.stringify(tasks), { status: 200 })
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return new Response("Unauthorized", { status: 401 })

  const body = await req.json()
  const task = await prisma.task.create({
    data: {
      title: body.title,
      userId: session.user.id,
    },
  })

  return new Response(JSON.stringify(task), { status: 201 })
}

export async function PUT(req) {
  const session = await getServerSession(authOptions)
  if (!session) return new Response("Unauthorized", { status: 401 })

  const body = await req.json()
  const task = await prisma.task.update({
    where: { id: body.id },
    data: { title: body.title, completed: body.completed },
  })

  return new Response(JSON.stringify(task), { status: 200 })
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions)
  if (!session) return new Response("Unauthorized", { status: 401 })

  const { id } = await req.json()
  await prisma.task.delete({ where: { id } })

  return new Response("Deleted", { status: 200 })
}
