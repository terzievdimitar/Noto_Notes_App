# Noto - MERN Notes App

Noto is a full-stack note-taking application built with the **MERN** stack (MongoDB, Express, React, Node.js). It allows users to create, view, update, and delete notes with a clean and modern UI.

## Features

- Create, read, update, and delete notes
- Responsive and modern UI using React, Tailwind CSS, and DaisyUI
- Rate limiting to prevent abuse (Upstash Redis)
- RESTful API with Express and MongoDB
- Toast notifications for user feedback
- Error handling and loading states
- Organized code structure for scalability

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, DaisyUI, React Router, Axios, Lucide Icons
- **Backend:** Node.js, Express, MongoDB (Mongoose), Upstash Redis (rate limiting)
- **Other:** dotenv, CORS, ESLint

## Project Structure

```
/backend
  ├── src/
  │   ├── config/         # Database and Upstash config
  │   ├── controllers/    # Express route controllers
  │   ├── middleware/     # Rate limiter middleware
  │   ├── models/         # Mongoose models
  │   ├── routes/         # API routes
  │   └── server.js       # Express app entry point
  └── .env                # Environment variables

/frontend
  ├── src/
  │   ├── components/     # Reusable React components
  │   ├── lib/            # Utility functions and Axios instance
  │   ├── pages/          # Page components (Home, Create, Detail)
  │   ├── App.jsx         # Main app component
  │   └── main.jsx        # React entry point
  ├── public/             # Static assets
  └── index.html          # HTML entry point
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database (local or Atlas)
- Upstash Redis account (for rate limiting)

### App Setup

1. Install dependencies:
      ```bash
      npm run build
      ```
2. Install dependencies:
      ```bash
      npm run start
      ```
3. Create a `.env` file .

4. Visit [http://localhost:5001](http://localhost:5001) in your browser.

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a note by ID
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Environment Variables

Example `.env` for `/backend`:

```
MONGO_URI=your_mongodb_connection_string
PORT=5001
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
CORS_ORIGIN=http://localhost:5173
NODE_ENV=production
```

## Notes

- The backend uses `app.set('trust proxy', 1);` for correct IP handling behind proxies.
- CORS is enabled for the frontend origin specified in `.env`.
- In production, the backend serves the frontend's static files from `frontend/dist`.

## License

This project is for educational purposes.
