import axios from 'axios';

const baseURL = import.meta.env.MODE !== 'production' ? 'http://localhost:5000/api' : '/api';

const axiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axiosInstance;
