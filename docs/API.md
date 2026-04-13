# EventSphere API Documentation

Base URL:

- Local: `http://localhost:5000/api`
- Production: `https://<your-vercel-domain>/api`

## Authentication

`POST /auth/signup`
- Create a new account with `name`, `email`, `password`, `role`, and optional profile fields.
- Accepts `multipart/form-data` for avatar uploads.

`POST /auth/login`
- Logs in a user and returns a JWT token plus user payload.

`POST /auth/forgot-password`
- Sends a reset email using Nodemailer.

`POST /auth/reset-password/:token`
- Resets the user password using a valid reset token.

`GET /auth/profile`
- Returns the currently authenticated user.

`PUT /auth/profile`
- Updates editable profile details and avatar.

`PUT /auth/change-password`
- Changes the authenticated user password.

## Public

`GET /public/landing`
- Returns featured events, trending events, categories, recent testimonials, and announcements for the landing page.

## Events

`GET /events`
- Query params supported: `status`, `featured`, `approved`, `category`, `organizer`, `search`.

`GET /events/featured/list`
- Returns featured approved events.

`GET /events/:slug`
- Returns a detailed event view, reviews, and registrations.

`POST /events`
- Create event. Organizer or admin only.
- Uses `multipart/form-data`.

`PUT /events/:id`
- Update event. Allowed for event owner organizer or admin.

`DELETE /events/:id`
- Delete event.

`POST /events/:id/favorite`
- Add or remove an event from the authenticated user's favorites.

`GET /events/favorites/list`
- Returns favorite events for the authenticated user.

## Registrations

`GET /registrations/mine`
- Returns all event registrations for the authenticated user.

`POST /registrations/:id`
- Register for an event.
- Automatically waitlists the user if the event is full.

`PUT /registrations/:id/cancel`
- Cancel a registration.

`POST /registrations/:id/reviews`
- Submit a review for an event.

`POST /registrations/check-in`
- Organizer or admin QR/ticket check-in endpoint.

`GET /registrations/event/:id`
- Returns participant list for an event.

`GET /registrations/event/:id/export`
- Exports participants as CSV.

## Organizer

`GET /organizer/dashboard`
- Organizer metrics, event list, and recent notifications.

`POST /organizer/announcements`
- Send organizer announcements for participants.

## Admin

`GET /admin/dashboard`
- Admin metrics, user growth, organizer performance.

`GET /admin/users`
- Returns all users except password hashes.

`GET /admin/categories`
- Returns categories.

`POST /admin/categories`
- Creates a category.

`GET /admin/announcements`
- Returns platform announcements.

`POST /admin/announcements`
- Creates a platform announcement.

`PUT /admin/events/:id/approve`
- Approves an organizer event.

`PUT /admin/events/:id/reject`
- Rejects an organizer event.

## Analytics

`GET /analytics`
- Role protected for admin and organizer.
- Returns summary metrics, category popularity, monthly growth, attendance chart, and revenue chart.

## Notifications

`GET /notifications`
- Returns all relevant notifications for the current user.

`PUT /notifications/:id/read`
- Marks a notification as read.
