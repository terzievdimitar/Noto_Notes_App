const rateLimitWindowMs = 60 * 1000; // 1 minute
const maxRequests = 100;

const ipRequestMap = new Map();

const rateLimiter = (req, res, next) => {
	const ip = req.ip || req.connection.remoteAddress;
	const now = Date.now();

	if (!ipRequestMap.has(ip)) {
		ipRequestMap.set(ip, []);
	}

	const timestamps = ipRequestMap.get(ip);

	// Remove timestamps older than window
	while (timestamps.length && timestamps[0] <= now - rateLimitWindowMs) {
		timestamps.shift();
	}

	if (timestamps.length >= maxRequests) {
		return res.status(429).json({ message: 'Too many requests, please try again later.' });
	}

	timestamps.push(now);
	ipRequestMap.set(ip, timestamps);

	next();
};

export default rateLimiter;
