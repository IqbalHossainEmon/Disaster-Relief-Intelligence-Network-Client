import API from './api';

const userService = {
	// Search Users by Name (Leader Only)
	searchUsers: async query => {
		const response = await API.get(`/users/search`, { params: { query } });
		return response.data;
	},

	// Get Current User
	getCurrentUser: async () => {
		const response = await API.get('/users/current');
		return response.data;
	},
};

export default userService;
