import API from './api';

const notificationService = {
	// Get Notifications
	getNotifications: async (params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		const response = await API.get(`/notifications${queryParams ? `?${queryParams}` : ''}`);
		return response.data;
	},

	// Mark Notification as Read
	markAsRead: async notificationId => {
		const response = await API.patch(`/notifications/${notificationId}/read`);
		return response.data;
	},

	// Mark All Notifications as Read
	markAllAsRead: async () => {
		const response = await API.post('/notifications/mark-all-read');
		return response.data;
	},
};

export default notificationService;
