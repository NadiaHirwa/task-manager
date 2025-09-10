# Task Manager - Project Structure

## 📋 Project Overview
A modern task management application built with Next.js 15, featuring user authentication, database integration, and a clean UI.

## 🛠️ Tech Stack
- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js v4
- **Password Hashing**: bcrypt
- **Runtime**: React 19.1.0

## 📁 Project Structure

```
task-manager/
├── app/                          # Next.js App Router directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── [...nextauth]/    # NextAuth.js configuration
│   │   │   │   └── route.js      # Auth handler (login/logout)
│   │   │   └── signup/           # User registration
│   │   │       └── route.js      # Signup API endpoint
│   │   └── tasks/                # Task management endpoints
│   │       ├── [id]/             # Individual task operations
│   │       │   └── route.js      # PUT/DELETE task endpoints
│   │       └── route.js          # GET/POST tasks endpoints
│   ├── auth/                     # Auth pages (App Router)
│   │   ├── login/
│   │   │   └── page.tsx          # Login UI component
│   │   └── signup/
│   │       └── page.tsx          # Signup UI component
│   ├── dashboard/                # Protected dashboard pages
│   │   └── tasks/
│   │       └── page.tsx          # Task management UI
│   ├── favicon.ico               # Site favicon
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   ├── providers.tsx             # Client providers (SessionProvider, etc.)
│   └── page.tsx                  # Home page (default Next.js page)
├── prisma/                       # Database configuration
│   ├── dev.db                    # SQLite database file
│   ├── migrations/               # Database migrations
│   │   ├── 20250908211602_init/                # Initial migration
│   │   │   └── migration.sql                   # Migration SQL
│   │   ├── 20250909102235_add_created_at_to_task/  # Adds createdAt to Task
│   │   │   └── migration.sql
│   │   └── migration_lock.toml                 # Migration lock file
│   └── schema.prisma             # Database schema definition
├── public/                       # Static assets
│   ├── file.svg                  # File icon
│   ├── globe.svg                 # Globe icon
│   ├── next.svg                  # Next.js logo
│   ├── vercel.svg                # Vercel logo
│   └── window.svg                # Window icon
├── eslint.config.mjs             # ESLint configuration
├── next-env.d.ts                 # Next.js TypeScript definitions
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.mjs            # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  password String
  tasks    Task[]
}
```

### Task Model
```prisma
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean   @default(false)
  createdAt DateTime  @default(now())
  user      User      @relation(fields: [userId], references: [id])
  userId    Int
}
```

## 🔐 Authentication System

### Features Implemented
- ✅ User registration with email/password
- ✅ Password hashing using bcrypt
- ✅ NextAuth.js configuration with JWT callbacks
- ✅ Credentials provider setup
- ✅ JWT session strategy with user ID in session
- ✅ Session-based authentication for API routes

### API Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/[...nextauth]` - Login/logout (NextAuth)
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

## 🚀 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npx prisma migrate dev -n add_createdAt_to_task # Create/apply migration
```

## 📦 Key Dependencies

### Production
- `@prisma/client` - Database client
- `bcrypt` - Password hashing
- `next` - React framework
- `next-auth` - Authentication
- `prisma` - Database ORM
- `react` - UI library
- `react-dom` - React DOM

### Development
- `@types/node` - Node.js types
- `@types/react` - React types
- `@types/react-dom` - React DOM types
- `eslint` - Code linting
- `tailwindcss` - CSS framework
- `typescript` - Type checking

## 🎯 Current Status

### ✅ Completed Features
- Project setup with Next.js 15
- Database schema with Prisma
- User registration system
- Password hashing and security
- NextAuth.js configuration with JWT callbacks
- Session-based authentication for API routes
- Task management API endpoints (CRUD)
- Task management UI at `/dashboard/tasks`
- Protected routes and session handling
- User-specific task isolation

### 🚧 In Development
- Task filtering and search functionality
- Task categories/priorities
- Enhanced UI/UX improvements
- Task due dates and reminders

### 📋 Next Steps
1. Add task filtering and search
2. Implement task categories/priorities
3. Add task due dates and reminders
4. Enhance UI/UX with better styling
5. Add task completion statistics
6. Implement task sharing/collaboration
7. Add task export functionality

## 🔧 Environment Setup

### Required Environment Variables
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Setup
```bash
npx prisma generate    # Generate Prisma client
npx prisma db push     # Push schema to database
npx prisma studio      # Open database GUI
```

## 🌐 Development Server
- **URL**: http://localhost:3000
- **Signup**: http://localhost:3000/api/auth/signup
- **Login page**: http://localhost:3000/auth/login
- **Signup page**: http://localhost:3000/auth/signup
- **Dashboard**: http://localhost:3000/dashboard/tasks
- **API Base**: http://localhost:3000/api
- **Database GUI**: Run `npx prisma studio`

---

*This project is built with modern web technologies and follows Next.js best practices for scalability and performance.*
