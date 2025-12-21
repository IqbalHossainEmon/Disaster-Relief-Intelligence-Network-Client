import API from './api';

const zoneService = {
	// Get All Zones
	getAllZones: async (params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		const response = await API.get(`/zones${queryParams ? `?${queryParams}` : ''}`);
		return response.data;
	},

	// Get Zone Details
	getZoneDetails: async zoneId => {
		const response = await API.get(`/zones/${zoneId}`);
		return response.data;
	},

	// Create Zone (Admin Only)
	createZone: async zoneData => {
		const response = await API.post('/zones', zoneData);
		return response.data;
	},

	// Update Zone (Admin Only)
	updateZone: async (zoneId, zoneData) => {
		const response = await API.patch(`/zones/${zoneId}`, zoneData);
		return response.data;
	},

	// Update Zone Statistics (Admin Only)
	updateZoneStatistics: async (zoneId, statisticsData) => {
		const response = await API.patch(`/zones/${zoneId}/statistics`, statisticsData);
		return response.data;
	},

	// Get Overall Statistics
	getOverallStatistics: async () => {
		const response = await API.get('/zones/stats/overview');
		return response.data;
	},

	// Get Zone Relief Needs
	getZoneReliefNeeds: async (zoneId, params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		const response = await API.get(`/zones/${zoneId}/relief-needs${queryParams ? `?${queryParams}` : ''}`);
		return response.data;
	},

	// Update Relief Need
	updateReliefNeed: async (needId, needData) => {
		const response = await API.patch(`/relief-needs/${needId}`, needData);
		return response.data;
	},
};

export default zoneService;
