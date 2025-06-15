import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
	})
);

app.set('trust proxy', 1);

app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

connectDB().then(() => {
	app.listen(process.env.PORT, () => {
		console.log('Server is running on port:', process.env.PORT);
	});
});
