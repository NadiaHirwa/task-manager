## Task Manager

A modern task management app built with Next.js 15, Prisma (SQLite), NextAuth, and Tailwind. Features user authentication, task CRUD operations, and a clean dashboard interface.

### Tech Stack
- Next.js 15 (App Router), React 19
- TypeScript, Tailwind CSS
- Prisma ORM with SQLite
- NextAuth.js (Credentials + JWT)
- bcrypt for password hashing

### Quick Start
```bash
npm install
cp .env.example .env   # or create .env as below
npx prisma generate
npx prisma migrate dev -n init       # first time only
npm run dev
```

App runs at: `http://localhost:3000`
- Dashboard: `http://localhost:3000/dashboard/tasks`

### Environment Variables (.env)
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### Database
Common commands:
```bash
npx prisma generate
npx prisma migrate dev -n add_createdAt_to_task
npx prisma studio
```

### Features
- ✅ User registration and authentication
- ✅ Secure password hashing
- ✅ JWT-based session management
- ✅ Task CRUD operations
- ✅ User-specific task isolation
- ✅ Protected routes
- ✅ Responsive dashboard UI

### API Routes
- **Auth**: `POST /api/auth/signup`, `POST /api/auth/[...nextauth]`
- **Tasks**: `GET /api/tasks`, `POST /api/tasks`, `PUT /api/tasks/[id]`, `DELETE /api/tasks/[id]`

### Pages
- Login: `GET /auth/login`
- Signup: `GET /auth/signup`
- Dashboard: `GET /dashboard/tasks`

### Scripts
```bash
npm run dev      # Start dev server
npm run build    # Build
npm run start    # Start production
npm run lint     # ESLint
```

### Usage
1. **Register**: Create an account at `/auth/signup`
2. **Login**: Sign in at `/auth/login`
3. **Manage Tasks**: Access the dashboard at `/dashboard/tasks`
4. **API Testing**: Use Postman with session cookies for API calls

### Project Structure
See `PROJECT_STRUCTURE.md` for a detailed tree and schema.

### Troubleshooting
- **"Unauthorized" in Postman**: Include NextAuth session cookies
- **"Module not found" errors**: Restart dev server after auth changes
- **Database issues**: Run `npx prisma generate` and `npx prisma db push`
