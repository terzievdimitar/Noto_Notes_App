import ratelimit from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
	try {
		// Generate a unique key for the rate limit based on the user's IP address
		const ip = req.ip || req.connection.remoteAddress;
		const { success } = await ratelimit.limit(`my-limit-key': ${ip}`);

		if (!success) {
			return res.status(429).json({ message: 'Too many requests, please try again later.' });
		}

		next();
	} catch (error) {
		console.error('Rate limiter error:', error);

		next(error);
	}
};

export default rateLimiter;
