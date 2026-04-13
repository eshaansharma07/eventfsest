# EventSphere

EventSphere is a production-minded futuristic event management platform built with the MERN stack in a monorepo. It combines premium event discovery, role-based dashboards, analytics, ticketing, registrations, notifications, and Vercel-ready deployment for colleges, clubs, institutes, RWAs, and local communities.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS + Framer Motion
- Backend: Node.js + Express.js
- Database: MongoDB Atlas with Mongoose
- Auth: JWT + bcryptjs
- Uploads: Multer + Cloudinary-ready utility
- Notifications: Nodemailer + toast notifications
- Charts: Recharts
- Calendar: React Big Calendar
- QR: qrcode
- PDF-ready dependency: jsPDF
- Deployment: Vercel static frontend + Vercel serverless backend

## Key Features

- Futuristic landing page with glassmorphism, floating metric cards, orbs, layered hero, and premium typography
- Role-based authentication for admin, organizer, and participant
- Event creation, editing, deletion, featured toggles, approvals, and favorites
- Participant registrations with QR ticket generation and waitlist logic
- Organizer dashboard with event performance and announcements
- Admin dashboard with platform growth and event approval controls
- Analytics page with attendance, registrations, category popularity, and revenue visuals
- Calendar page powered by React Big Calendar
- Notifications, favorites, registrations, legal pages, FAQ, about, contact, and 404 route
- Seed script with demo users, events, reviews, registrations, and notifications
- Vercel-compatible backend entry via `server/api/index.js`

## Monorepo Structure

```text
client/
server/
docs/
public/
.env.example
vercel.json
README.md
```

## Demo Accounts

- Admin: `admin@eventsphere.app` / `Admin@123`
- Organizer: `organizer@eventsphere.app` / `Organizer@123`
- Participant: `student@eventsphere.app` / `Student@123`

## Local Setup

1. Install dependencies:
   `npm install`
2. Update environment values:
   - Copy `.env.example` values into `server/.env`
   - Set `client/.env` with `VITE_API_URL=http://localhost:5000/api`
3. Seed demo data:
   `npm run seed`
4. Start development:
   `npm run dev`

## Important Environment Variables

- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `VITE_API_URL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASS`
- `EMAIL_FROM`

## Deployment Notes

### Frontend on Vercel

- Root project uses a monorepo workspace layout.
- Vercel builds the React app from `client/package.json`.
- Configure `VITE_API_URL` to your deployed backend API path, typically `https://<domain>/api`.

Recommended frontend environment variable:

- `VITE_API_URL=https://your-project.vercel.app/api`

### Backend on Vercel

- The backend is exposed through `server/api/index.js`.
- The Express app is exported without a traditional `listen()` call.
- MongoDB connection is initialized through `connectDB()` for serverless compatibility.

Required backend environment variables on Vercel:

- `MONGODB_URI=mongodb+srv://...`
- `JWT_SECRET=your-strong-production-secret`
- `JWT_EXPIRES_IN=7d`
- `CLIENT_URL=https://your-project.vercel.app`
- `EMAIL_HOST=smtp.gmail.com`
- `EMAIL_PORT=587`
- `EMAIL_USER=your-email`
- `EMAIL_PASS=your-app-password`
- `EMAIL_FROM=EventSphere <no-reply@eventsphere.app>`
- `CLOUDINARY_CLOUD_NAME=...`
- `CLOUDINARY_API_KEY=...`
- `CLOUDINARY_API_SECRET=...`

### Suggested Vercel Setup

1. Import the GitHub repository into Vercel.
2. Keep the root directory as the repository root.
3. Add all backend env vars in the Vercel project settings.
4. Add `VITE_API_URL` in the frontend environment settings.
5. Redeploy after every environment change.
6. Test these deployed routes first:
   - `/`
   - `/login`
   - `/dashboard`
   - `/api/health`

### Production Checklist

- Add strong production secrets
- Configure Cloudinary credentials before enabling image uploads
- Configure SMTP credentials before forgot-password email flow
- Add your Vercel project environment variables for both frontend and backend
- Seed or import production data if needed

## API Documentation

- Full endpoint reference: [docs/API.md](/Users/eshaansharma07/Downloads/FULL STACK PROJECT/docs/API.md)

## Sample Screenshots Guide

Use these pages for your project report or viva screenshots:

- Landing hero with floating dashboard preview
- Participant dashboard
- Organizer dashboard
- Admin dashboard
- Event details page
- Analytics page
- Calendar page

## Presentation Highlights

- Explain the three-role architecture first
- Show landing page visual identity before entering the app
- Log in with organizer credentials and create or review an event
- Switch to admin and show approval plus analytics flow
- Switch to participant and show favorites, registrations, and notifications

## GitHub Push Instructions

1. Initialize git if needed:
   `git init`
2. Add the repository:
   `git remote add origin https://github.com/eshaansharma07/eventfsest.git`
3. Commit:
   `git add . && git commit -m "feat: build EventSphere MERN monorepo"`
4. Push:
   `git branch -M main && git push -u origin main`

## Notes

- Local secret files like `server/.env` and `client/.env` are ignored by git.
- Image uploads gracefully no-op when Cloudinary is not configured.
- The backend seed script resets the demo collections before inserting fresh data.
