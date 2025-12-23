import API from './api';

const assignmentService = {
	// Submit Assignment Request
	submitRequest: async requestData => {
		const response = await API.post('/assignment-requests', requestData);
		return response.data;
	},

	// Get Assignment Requests
	getRequests: async (params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		const response = await API.get(`/assignment-requests${queryParams ? `?${queryParams}` : ''}`);
		return response.data;
	},

	// Get Assignment Request Details
	getRequestDetails: async requestId => {
		const response = await API.get(`/assignment-requests/${requestId}`);
		return response.data;
	},

	// Approve Assignment Request (Admin Only)
	approveRequest: async (requestId, notes = null) => {
		const response = await API.post(`/assignment-requests/${requestId}/approve`, { notes });
		return response.data;
	},

	// Reject Assignment Request (Admin Only)
	rejectRequest: async (requestId, reason) => {
		const response = await API.post(`/assignment-requests/${requestId}/reject`, { reason });
		return response.data;
	},

	// Get Zone Assignments
	getAssignments: async (params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		const response = await API.get(`/assignments${queryParams ? `?${queryParams}` : ''}`);
		console.log(queryParams);

		return response.data;
	},

	// Update Assignment Status
	updateAssignmentStatus: async (assignmentId, statusData) => {
		const response = await API.patch(`/assignments/${assignmentId}`, statusData);
		return response.data;
	},

	// Upload Evidence Files
	uploadEvidence: async formData => {
		// Don't manually set Content-Type - let axios set it with proper boundary
		const response = await API.post('/upload/evidence', formData);
		return response.data;
	},
};

export default assignmentService;
