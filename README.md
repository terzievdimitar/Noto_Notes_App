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

### Backend Setup

1. Install dependencies:
      ```bash
      cd backend
      npm install
      ```
2. Create a `.env` file (see `.env` for example).
3. Start the backend server:
      ```bash
      npm run dev
      ```

### Frontend Setup

1. Install dependencies:
      ```bash
      cd frontend
      npm install
      ```
2. Start the frontend dev server:
      ```bash
      npm run dev
      ```
3. Visit [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a note by ID
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## License

This project is for educational purposes.
