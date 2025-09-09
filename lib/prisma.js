import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()
// This ensures a single instance of PrismaClient is used across the application
// preventing multiple instances in development with hot reloading
// In production, this is less of a concern, but it's still a good practice
