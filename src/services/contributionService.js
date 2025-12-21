import API from './api';

const contributionService = {
	// Record Contribution
	recordContribution: async contributionData => {
		const response = await API.post('/contributions', contributionData);
		return response.data;
	},

	// Get Contributions
	getContributions: async (params = {}) => {
		const queryParams = new URLSearchParams(params).toString();
		const response = await API.get(`/contributions${queryParams ? `?${queryParams}` : ''}`);
		return response.data;
	},
};

export default contributionService;
