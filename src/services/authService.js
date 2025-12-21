import API from './api';

const authService = {
	// User Registration
	register: async userData => {
		const response = await API.post('/auth/register', userData);
		if (response.data.token) {
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', JSON.stringify(response.data.user));
		}
		return response.data;
	},

	// User Login
	login: async (email, password) => {
		const response = await API.post('/auth/login', { email, password });
		if (response.data.token) {
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user', JSON.stringify(response.data.user));
		}
		return response.data;
	},

	// Logout
	logout: () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	},

	// Get Current User
	getCurrentUser: async () => {
		const response = await API.get('/auth/me');
		if (response.data.user) {
			localStorage.setItem('user', JSON.stringify(response.data.user));
		}
		return response.data;
	},

	// Update Profile
	updateProfile: async profileData => {
		const response = await API.patch('/auth/profile', profileData);
		if (response.data.user) {
			localStorage.setItem('user', JSON.stringify(response.data.user));
		}
		return response.data;
	},

	// Verify Organization Code
	verifyOrganizationCode: async code => {
		const response = await API.post('/auth/verify-organization-code', { code });
		return response.data;
	},

	// Get stored user from localStorage
	getStoredUser: () => {
		const user = localStorage.getItem('user');
		return user ? JSON.parse(user) : null;
	},

	// Get stored token from localStorage
	getStoredToken: () => {
		return localStorage.getItem('token');
	},

	// Check if user is authenticated
	isAuthenticated: () => {
		return !!localStorage.getItem('token');
	},
};

export default authService;
