import axios from 'axios';

const API = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor - Add auth token to all requests
API.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// If sending FormData, remove Content-Type to let browser set it with boundary
		if (config.data instanceof FormData) {
			delete config.headers['Content-Type'];
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// Response interceptor - Handle errors globally
API.interceptors.response.use(
	response => {
		// Return the data directly for easier consumption
		return response.data;
	},
	error => {
		// Handle common errors
		console.error('API Error:', error);
		console.error('Error details:', {
			message: error.message,
			response: error.response?.data,
			status: error.response?.status,
			config: {
				url: error.config?.url,
				method: error.config?.method,
				data: error.config?.data instanceof FormData ? 'FormData' : error.config?.data,
			},
		});

		if (error.response) {
			// Server responded with error
			const { status, data } = error.response;

			if (status === 401) {
				// Unauthorized - clear token and redirect to login
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				window.location.href = '/login';
			}

			// Return error data
			return Promise.reject(data?.error || { message: 'An error occurred' });
		} else if (error.request) {
			// Request made but no response
			console.error('No response received from server. Request:', error.request);
			return Promise.reject({ message: 'Network error. Please check your connection.' });
		} else {
			// Something else happened
			return Promise.reject({ message: error.message || 'An unexpected error occurred' });
		}
	}
);

export default API;
