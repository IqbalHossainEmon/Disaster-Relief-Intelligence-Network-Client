import API from './api';

const adminService = {
	// Get Dashboard Statistics (Admin Only)
	getDashboardStats: async () => {
		const response = await API.get('/admin/dashboard/stats');
		return response.data;
	},

	// Get All Users (Admin Only)
	getAllUsers: async (params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		const response = await API.get(`/admin/users${queryParams ? `?${queryParams}` : ''}`);
		return response.data;
	},

	// Update User Status (Admin Only)
	updateUserStatus: async (userId, statusData) => {
		const response = await API.patch(`/admin/users/${userId}/status`, statusData);
		return response.data;
	},

	// Get All Organizations (Admin Only)
	getAllOrganizations: async (params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		const response = await API.get(`/admin/organizations${queryParams ? `?${queryParams}` : ''}`);
		return response.data;
	},

	// Verify Organization (Admin Only)
	verifyOrganization: async organizationId => {
		const response = await API.post(`/admin/organizations/${organizationId}/verify`);
		return response.data;
	},
};

export default adminService;
