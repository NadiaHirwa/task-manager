## Task Manager

A modern task management app built with Next.js 15, Prisma (SQLite), NextAuth, and Tailwind.

### Tech Stack
- Next.js 15 (App Router), React 19
- TypeScript, Tailwind CSS
- Prisma ORM with SQLite
- NextAuth.js (Credentials)

### Quick Start
```bash
npm install
cp .env.example .env   # or create .env as below
npx prisma generate
npx prisma migrate dev -n init       # first time only
npm run dev
```

App runs at: `http://localhost:3000`

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

### Auth Routes
- Signup API: `POST /api/auth/signup`
- NextAuth: `POST /api/auth/[...nextauth]`
- Login page: `GET /auth/login`
- Signup page: `GET /auth/signup`

### Scripts
```bash
npm run dev      # Start dev server
npm run build    # Build
npm run start    # Start production
npm run lint     # ESLint
```

### Project Structure
See `PROJECT_STRUCTURE.md` for a detailed tree and schema.
