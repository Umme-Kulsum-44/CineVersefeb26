# CineVerse - Movie Streaming Platform

A Netflix-style movie streaming platform with user authentication and TMDB integration.

## Features

- User Registration & Login with encrypted passwords
- Browse movies from TMDB API
- Netflix-style UI with scrollable movie rows
- Movie details modal
- Responsive design

## Local Development

### Prerequisites
- Node.js 18+
- MySQL database (Aiven or local)

### Setup

1. Clone the repository
```bash
git clone https://github.com/Umme-Kulsum-44/CineVersefeb26.git
cd CineVersefeb26
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
```

4. Create `.env` file in server directory
```bash
DB_HOST=your-database-host
DB_PORT=16663
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=defaultdb
```

5. Start backend server
```bash
cd server
npm start
```

6. Start frontend (in new terminal)
```bash
npm run dev
```

7. Open http://localhost:5173

## Deployment on Render

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New" → "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect `render.yaml` and deploy both services
6. Add `DB_PASSWORD` as a secret environment variable in Render dashboard

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MySQL (Aiven)
- Authentication: bcrypt
- API: TMDB
