import API from './api';

const organizationService = {
	// Get Organization Details
	getOrganizationDetails: async organizationId => {
		const response = await API.get(`/organizations/${organizationId}`);
		return response.data;
	},

	// Get Organization Members
	getOrganizationMembers: async organizationId => {
		const response = await API.get(`/organizations/${organizationId}/members`);
		return response.data;
	},

	// Update Organization (Leader Only)
	updateOrganization: async (organizationId, orgData) => {
		const response = await API.patch(`/organizations/${organizationId}`, orgData);
		return response.data;
	},

	// Regenerate Invitation Code (Leader Only)
	regenerateInvitationCode: async organizationId => {
		const response = await API.post(`/organizations/${organizationId}/regenerate-code`);
		return response.data;
	},

	// Add Member to Organization (Leader Only)
	addMember: async (organizationId, userId) => {
		const response = await API.post(`/organizations/${organizationId}/members`, { userId });
		return response.data;
	},

	// Update Member Role (Leader Only)
	updateMemberRole: async (organizationId, memberId, role) => {
		const response = await API.put(`/organizations/${organizationId}/members/${memberId}/role`, { role });
		return response.data;
	},

	// Remove Member from Organization (Leader Only)
	removeMember: async (organizationId, memberId) => {
		const response = await API.delete(`/organizations/${organizationId}/members/${memberId}`);
		return response.data;
	},

	// Send Join Request
	sendJoinRequest: async (organizationId, message = '') => {
		const response = await API.post(`/organizations/${organizationId}/join-requests`, { message });
		return response.data;
	},

	// Get Join Requests (Leader Only)
	getJoinRequests: async organizationId => {
		const response = await API.get(`/organizations/${organizationId}/join-requests`);
		return response.data;
	},

	// Approve Join Request (Leader Only)
	approveJoinRequest: async (organizationId, requestId) => {
		const response = await API.put(`/organizations/${organizationId}/join-requests/${requestId}/approve`);
		return response.data;
	},

	// Reject Join Request (Leader Only)
	rejectJoinRequest: async (organizationId, requestId) => {
		const response = await API.put(`/organizations/${organizationId}/join-requests/${requestId}/reject`);
		return response.data;
	},
};

export default organizationService;
