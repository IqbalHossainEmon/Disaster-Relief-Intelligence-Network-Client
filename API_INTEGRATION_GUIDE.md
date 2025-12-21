# DRIN Frontend - API Integration Guide

## ✅ API Services Setup Complete

All API endpoints from `API_ENDPOINTS.md` have been integrated into the frontend application.

## 📁 Project Structure

```
src/
├── services/
│   ├── api.js                    # Base axios instance with interceptors
│   ├── authService.js            # Authentication endpoints
│   ├── zoneService.js            # Disaster zones endpoints
│   ├── assignmentService.js      # Assignment requests endpoints
│   ├── organizationService.js    # Organization endpoints
│   ├── contributionService.js    # Contributions endpoints
│   ├── notificationService.js    # Notifications endpoints
│   ├── adminService.js           # Admin dashboard endpoints
│   ├── uploadService.js          # File upload endpoints
│   └── index.js                  # Export all services
├── context/
│   └── AuthContext.jsx           # Authentication context provider
└── components/
    └── [Updated to use real API]
```

## 🚀 Setup Instructions

### 1. Environment Variable

Make sure your `.env` file has:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 2. Start Backend Server

Before using the frontend, ensure your backend is running on `http://localhost:5000`

### 3. Test Credentials

Use these credentials to test the application:

**Admin:**

- Email: `admin@drin.org`
- Password: `admin123`

**Leader (Feni Rescue Team):**

- Email: `ahmed@fenirescue.org`
- Password: `password123`

**Member:**

- Email: `nurul@fenirescue.org`
- Password: `member123`

## 📚 How to Use the Services

### Import Services

```javascript
import { authService, zoneService, assignmentService } from '../services';
```

### Authentication Example

```javascript
// Login
const handleLogin = async (email, password) => {
	try {
		const response = await authService.login(email, password);
		console.log('User:', response.user);
		console.log('Token:', response.token);
		// Token is automatically stored in localStorage
	} catch (error) {
		console.error('Login failed:', error.message);
	}
};

// Get current user
const user = authService.getStoredUser();
const isAuthenticated = authService.isAuthenticated();

// Logout
authService.logout();
```

### Fetch Disaster Zones

```javascript
// Get all zones
const zones = await zoneService.getAllZones();

// Get zones with filters
const criticalZones = await zoneService.getAllZones({
	severity: 'critical',
	limit: 10,
});

// Get zone details
const zoneDetails = await zoneService.getZoneDetails(zoneId);

// Get overall statistics
const stats = await zoneService.getOverallStatistics();
```

### Assignment Requests

```javascript
// Submit a request (Leader)
const request = await assignmentService.submitRequest({
	zoneId: 'zone-001',
	proposedTeamSize: 15,
	estimatedDuration: '7 days',
	capabilities: 'Medical aid, food distribution',
	teamMembers: [
		/* array of members */
	],
});

// Get requests
const requests = await assignmentService.getRequests({
	status: 'pending',
});

// Approve request (Admin)
await assignmentService.approveRequest(requestId, 'Approved with notes');

// Reject request (Admin)
await assignmentService.rejectRequest(requestId, 'Reason for rejection');
```

### File Uploads

```javascript
import { uploadService } from '../services';

// Upload evidence files
const handleUploadEvidence = async files => {
	try {
		const response = await uploadService.uploadEvidence(files);
		console.log('Uploaded files:', response.files);
	} catch (error) {
		console.error('Upload failed:', error);
	}
};

// Upload profile picture
const handleUploadProfile = async file => {
	const response = await uploadService.uploadProfilePicture(file);
	console.log('Profile picture URL:', response.profilePictureUrl);
};
```

### Admin Dashboard

```javascript
// Get dashboard stats (Admin only)
const stats = await adminService.getDashboardStats();

// Get all users
const users = await adminService.getAllUsers({
	role: 'leader',
	limit: 20,
});

// Update user status
await adminService.updateUserStatus(userId, {
	isActive: false,
	reason: 'Inactive account',
});
```

## 🔐 Authentication Flow

1. **Token Management**: JWT tokens are automatically stored in `localStorage` after login
2. **Automatic Headers**: All API requests include the token in `Authorization: Bearer <token>` header
3. **Auto Redirect**: If a 401 (Unauthorized) response is received, user is automatically redirected to login
4. **Token Persistence**: User stays logged in across page refreshes

## 🛠️ API Response Handling

### Success Response

```javascript
{
  success: true,
  data: {
    // response data
  }
}
```

### Error Response

```javascript
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Error message",
    details: null
  }
}
```

## 📝 Components Updated

The following components have been updated to use real API:

1. **Login.jsx** - Uses `authService.login()`
2. **DisasterMap.jsx** - Uses `zoneService.getAllZones()` and `zoneService.getOverallStatistics()`
3. **ZoneDetails.jsx** - Uses `zoneService.getZoneDetails()`
4. **AssignmentRequests.jsx** - Uses `assignmentService.getRequests()`, `approveRequest()`, `rejectRequest()`

## 🔄 Next Steps

### Additional Components to Update:

1. **SignUp Component** - Integrate with `authService.register()`
2. **UserManagement Component** - Use `adminService.getAllUsers()`
3. **ZoneStatus Component** - Use `adminService.getDashboardStats()`
4. **Contribution History** - Use `contributionService.getContributions()`
5. **Notifications** - Use `notificationService.getNotifications()`

### Example: Update SignUp Component

```javascript
import { authService } from '../../../services';

const handleSignUp = async formData => {
	try {
		const response = await authService.register({
			fullName: formData.fullName,
			email: formData.email,
			password: formData.password,
			phone: formData.phone,
			role: formData.role,
			// Add other fields based on role
		});
		// Redirect to dashboard after successful registration
		navigate('/disaster-map');
	} catch (error) {
		setError(error.message);
	}
};
```

## 🐛 Debugging Tips

1. **Check Network Tab**: Open browser DevTools > Network to see API requests
2. **Console Logs**: API errors are logged to console
3. **Token Issues**: Clear localStorage if you face authentication issues
   ```javascript
   localStorage.clear();
   ```
4. **CORS Errors**: Make sure backend has CORS configured for `http://localhost:5173`

## 📱 Example: Complete Component with API

```javascript
import { useState, useEffect } from 'react';
import { zoneService } from '../../../services';

function ZoneList() {
	const [zones, setZones] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchZones();
	}, []);

	const fetchZones = async () => {
		try {
			setLoading(true);
			const response = await zoneService.getAllZones();
			setZones(response.zones || []);
		} catch (err) {
			setError(err.message || 'Failed to fetch zones');
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			{zones.map(zone => (
				<div key={zone.id}>{zone.name}</div>
			))}
		</div>
	);
}
```

## 🎯 Testing

1. Start your backend server
2. Start frontend: `npm run dev`
3. Navigate to `http://localhost:5173`
4. Login with test credentials
5. Check browser console for any errors
6. Use Network tab to verify API calls

## ✨ Features

- ✅ Automatic JWT token management
- ✅ Global error handling
- ✅ Loading states
- ✅ Auto redirect on 401
- ✅ Request/Response interceptors
- ✅ Type-safe API calls
- ✅ Clean service separation

## 📞 Support

If you encounter issues:

1. Check backend is running on port 5000
2. Verify `.env` has correct API URL
3. Check browser console for errors
4. Inspect Network tab for failed requests

---

**Happy Coding! 🚀**
