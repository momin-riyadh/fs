# Full Stack Setup (Nest + Next)

This repo has a NestJS backend in `nest-explore` and a Next.js frontend in `next-web`.

## Requirements

- Node.js and npm
- MySQL server

## Backend (NestJS)

1) Install dependencies:

```bash
cd nest-explore
npm install
```

2) Configure environment:

- Edit `nest-explore/.env`
- Set `DATABASE_URL` to your MySQL credentials, for example:

```
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/nest_explore"
```

3) Create the database and run Prisma:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS nest_explore;"
npx prisma generate
npx prisma migrate dev --name init
```

4) Run the API:

```bash
npm run start:dev
```

The backend listens on `process.env.PORT` or defaults to `3000`.

## Frontend (Next.js)

1) Install dependencies:

```bash
cd next-web
npm install
```

2) Run the web app:

```bash
npm run dev -- -p 3001
```

By default, Next uses port `3000`. Use `-p 3001` to avoid the backend port.
