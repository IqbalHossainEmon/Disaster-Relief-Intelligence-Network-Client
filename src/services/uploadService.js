import API from './api';

const uploadService = {
	// Upload Evidence Files
	uploadEvidence: async (files, requestId = null) => {
		const formData = new FormData();

		// Add files to form data
		for (let i = 0; i < files.length; i++) {
			formData.append('files', files[i]);
		}

		// Add request ID if provided
		if (requestId) {
			formData.append('requestId', requestId);
		}

		const response = await API.post('/upload/evidence', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},

	// Upload Profile Picture
	uploadProfilePicture: async file => {
		const formData = new FormData();
		formData.append('file', file);

		const response = await API.post('/upload/profile-picture', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	},
};

export default uploadService;
