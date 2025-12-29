# Dummy Front

A minimal React + Vite frontend to test your NestJS backend.

## Features

- Login and Register (`/api/auth/login`, `/api/auth/register`)
- List Events and register/unregister (`/api/events`)
- View Profile (`/api/users/me`)
- Token-based auth stored in localStorage
- Vite dev proxy to backend to avoid CORS

## Dev Setup

1. Ensure your backend is running on port 5000.
2. Install and start the frontend:

```
npm install
npm run dev
```

The app runs at http://localhost:5173 and proxies `/api/*` to `http://localhost:5000`.

## Configuration

- To call the backend directly (without proxy), set an env var:
  - Create a `.env.local` with:

```
VITE_API_URL=http://localhost:5000/api
```

- By default, the app uses `/api` base and relies on the dev proxy defined in `vite.config.js`.
