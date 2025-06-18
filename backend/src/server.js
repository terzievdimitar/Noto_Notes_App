import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json()); // Middleware to parse JSON bodies

if (!process.env.NODE_ENV !== 'production') {
	app.use(
		cors({
			origin: process.env.CORS_ORIGIN,
		})
	);
}

app.set('trust proxy', 1);

app.use('/api/notes', rateLimiter, notesRoutes);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/dist')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
	});
}

connectDB().then(() => {
	app.listen(process.env.PORT, () => {
		console.log('Server is running on port:', process.env.PORT);
	});
});
