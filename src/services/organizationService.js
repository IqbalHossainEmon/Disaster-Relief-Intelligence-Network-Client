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
};

export default organizationService;
