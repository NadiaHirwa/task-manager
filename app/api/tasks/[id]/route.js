import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma" // we'll create this prisma client file

// 🔹 Update task (PUT) & Delete task (DELETE)
export async function PUT(req, { params}) {
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Unauthorized", { status: 401 })

    const body = await req.json()
    const taskId = parseInt(params.id) 

    const updated = await prisma.task.update({
      where: { id: taskId, userId: session.user.id },
      data: { title: body.title, completed: body.completed },
    })

    return Response.json(updated)
}

export async function DELETE(req, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Unauthorized", { status: 401 })

    const taskId = parseInt(params.id)

    await prisma.task.delete({
        where: { id:taskId, userId: session.user.id },
    })

    return Response.json({ message: "Task deleted" })
}