"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"

type Task = {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

export default function TasksPage() {
  const { data: session, status } = useSession()
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [loading, setLoading] = useState(true)

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("/api/tasks")
    if (res.ok) {
      const data = await res.json()
      setTasks(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (status === "authenticated") fetchTasks()
  }, [status])

  if (status === "loading") return <p className="mt-10 text-center">⏳ Checking session...</p>
  if (status === "unauthenticated") return <p className="mt-10 text-center">❌ Please login first</p>

  // Create task
  const handleAddTask = async () => {
    if (!newTitle.trim()) return
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    })
    if (res.ok) {
      setNewTitle("")
      fetchTasks()
    }
  }

  // Update task
  const toggleComplete = async (task: Task) => {
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, title: task.title, completed: !task.completed }),
    })
    fetchTasks()
  }

  // Delete task
  const handleDelete = async (id: number) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchTasks()
  }

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks for {session?.user?.email}</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="New task"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 flex-1 rounded mr-2"
        />
        <button onClick={handleAddTask} className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet!</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                  className="mr-2"
                />
                <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
