# DRIN Backend API Endpoints

**Base URL:** `http://localhost:5000/api`

---

## 🔐 Authentication Endpoints

### 1. User Registration

- **POST** `/api/auth/register`
- Register a new user (leader creates organization, member joins with code)
- **Body:** `{ fullName, email, password, phone, role, organizationName, organizationType, organizationAddress, organizationPhone, organizationCode }`
- **Response:** `{ user, token }`

### 2. User Login

- **POST** `/api/auth/login`
- Login with email and password
- **Body:** `{ email, password }`
- **Response:** `{ user, token }`

### 3. Get Current User

- **GET** `/api/auth/me`
- Get logged-in user profile
- **Auth Required:** Yes
- **Response:** `{ user, organization }`

### 4. Update Profile

- **PATCH** `/api/auth/profile`
- Update user profile information
- **Auth Required:** Yes
- **Body:** `{ fullName?, phone?, profilePictureUrl? }`
- **Response:** `{ user }`

### 5. Verify Organization Code

- **POST** `/api/auth/verify-organization-code`
- Verify organization invitation code before joining
- **Body:** `{ code }`
- **Response:** `{ organization: { id, name, organizationType } }`

---

## 🗺️ Disaster Zones Endpoints

### 6. Get All Zones

- **GET** `/api/zones`
- List all disaster zones with filters
- **Query Params:** `severity?, hasAssignedTeam?, limit?, offset?`
- **Response:** `{ zones[], pagination }`

### 7. Get Zone Details

- **GET** `/api/zones/:zoneId`
- Get detailed information about a specific zone
- **Response:** `{ zone, statistics, reliefNeeds[], assignments[] }`

### 8. Create Zone (Admin Only)

- **POST** `/api/zones`
- Create a new disaster zone
- **Auth Required:** Admin
- **Body:** `{ name, location, coordinates, radius, severity, population, description? }`
- **Response:** `{ zone }`

### 9. Update Zone (Admin Only)

- **PATCH** `/api/zones/:zoneId`
- Update zone information
- **Auth Required:** Admin
- **Body:** `{ severity?, affectedPeople?, description? }`
- **Response:** `{ zone }`

### 10. Update Zone Statistics (Admin Only)

- **PATCH** `/api/zones/:zoneId/statistics`
- Update zone statistics
- **Auth Required:** Admin
- **Body:** `{ evacuationProgress?, shelterCapacity?, peopleInShelter?, medicalTeams?, foodDistributed?, waterSupplyStatus?, communicationStatus?, roadsAccessible? }`
- **Response:** `{ statistics }`

### 11. Get Overall Statistics

- **GET** `/api/zones/stats/overview`
- Get overall system statistics
- **Response:** `{ activeDisasterZones, affectedPeople, safeZones, shelterCapacity, peopleInShelters, highUrgencyNeeds, criticalZones, highRiskZones, moderateRiskZones }`

### 12. Get Zone Relief Needs

- **GET** `/api/zones/:zoneId/relief-needs`
- Get relief needs for a specific zone
- **Query Params:** `category?, priority?`
- **Response:** `{ reliefNeeds[] }`

### 13. Update Relief Need

- **PATCH** `/api/relief-needs/:needId`
- Update relief need delivery status
- **Auth Required:** Admin or Assigned Team
- **Body:** `{ quantityDelivered?, notes? }`
- **Response:** `{ reliefNeed }`

---

## 📋 Assignment Requests Endpoints

### 14. Submit Assignment Request

- **POST** `/api/assignment-requests`
- Submit request to be assigned to a zone
- **Auth Required:** Leader
- **Body:** `{ zoneId, proposedTeamSize, estimatedDuration, capabilities, resources?, notes?, teamMembers[] }`
- **Response:** `{ request }`

### 15. Get Assignment Requests

- **GET** `/api/assignment-requests`
- List assignment requests (admin sees all, others see own org)
- **Auth Required:** Yes
- **Query Params:** `status?, zoneId?, organizationId?, limit?, offset?`
- **Response:** `{ requests[], pagination }`

### 16. Get Assignment Request Details

- **GET** `/api/assignment-requests/:requestId`
- Get detailed info about a specific request
- **Auth Required:** Yes
- **Response:** `{ request, organization, zone, requestedBy, members[], evidence[] }`

### 17. Approve Assignment Request (Admin Only)

- **POST** `/api/assignment-requests/:requestId/approve`
- Approve an assignment request
- **Auth Required:** Admin
- **Body:** `{ notes? }`
- **Response:** `{ request, assignment }`

### 18. Reject Assignment Request (Admin Only)

- **POST** `/api/assignment-requests/:requestId/reject`
- Reject an assignment request
- **Auth Required:** Admin
- **Body:** `{ reason }`
- **Response:** `{ request }`

---

## 🏢 Organizations Endpoints

### 19. Get Organization Details

- **GET** `/api/organizations/:organizationId`
- Get organization information
- **Auth Required:** Yes
- **Response:** `{ organization }`

### 20. Get Organization Members

- **GET** `/api/organizations/:organizationId/members`
- List all members of an organization
- **Auth Required:** Yes
- **Response:** `{ members[] }`

### 21. Update Organization (Leader Only)

- **PATCH** `/api/organizations/:organizationId`
- Update organization details
- **Auth Required:** Leader or Admin
- **Body:** `{ description?, contactPhone?, address?, website? }`
- **Response:** `{ organization }`

### 22. Regenerate Invitation Code (Leader Only)

- **POST** `/api/organizations/:organizationId/regenerate-code`
- Generate new invitation code
- **Auth Required:** Leader or Admin
- **Response:** `{ invitationCode }`

---

## 🎯 Zone Assignments Endpoints

### 23. Get Zone Assignments

- **GET** `/api/assignments`
- List zone assignments
- **Auth Required:** Yes
- **Query Params:** `zoneId?, organizationId?, status?, limit?, offset?`
- **Response:** `{ assignments[], pagination }`

### 24. Update Assignment Status

- **PATCH** `/api/assignments/:assignmentId`
- Update assignment completion status
- **Auth Required:** Admin or Leader
- **Body:** `{ completionStatus?, notes? }`
- **Response:** `{ assignment }`

---

## 🤝 Contributions Endpoints

### 25. Record Contribution

- **POST** `/api/contributions`
- Record a contribution/delivery
- **Auth Required:** Yes
- **Body:** `{ zoneId, reliefNeedId?, quantity, unit, notes? }`
- **Response:** `{ contribution }`

### 26. Get Contributions

- **GET** `/api/contributions`
- List contribution history
- **Auth Required:** Yes
- **Query Params:** `organizationId?, zoneId?, startDate?, endDate?, limit?, offset?`
- **Response:** `{ contributions[], pagination }`

---

## 🔔 Notifications Endpoints

### 27. Get Notifications

- **GET** `/api/notifications`
- Get user notifications
- **Auth Required:** Yes
- **Query Params:** `isRead?, limit?, offset?`
- **Response:** `{ notifications[], pagination }`

### 28. Mark Notification as Read

- **PATCH** `/api/notifications/:notificationId/read`
- Mark a single notification as read
- **Auth Required:** Yes
- **Response:** `{ notification }`

### 29. Mark All Notifications as Read

- **POST** `/api/notifications/mark-all-read`
- Mark all user notifications as read
- **Auth Required:** Yes
- **Response:** `{ message }`

---

## 👨‍💼 Admin Dashboard Endpoints

### 30. Get Dashboard Statistics (Admin Only)

- **GET** `/api/admin/dashboard/stats`
- Get comprehensive dashboard statistics
- **Auth Required:** Admin
- **Response:** `{ totalUsers, activeUsers, totalOrganizations, verifiedOrganizations, totalZones, activeDisasterZones, pendingRequests, approvedRequests, activeAssignments, totalContributions, recentRequests[], recentZones[] }`

### 31. Get All Users (Admin Only)

- **GET** `/api/admin/users`
- List all users in the system
- **Auth Required:** Admin
- **Query Params:** `role?, isActive?, organizationId?, limit?, offset?`
- **Response:** `{ users[], pagination }`

### 32. Update User Status (Admin Only)

- **PATCH** `/api/admin/users/:userId/status`
- Activate or deactivate a user
- **Auth Required:** Admin
- **Body:** `{ isActive, reason? }`
- **Response:** `{ user }`

### 33. Get All Organizations (Admin Only)

- **GET** `/api/admin/organizations`
- List all organizations
- **Auth Required:** Admin
- **Query Params:** `organizationType?, isVerified?, isActive?, limit?, offset?`
- **Response:** `{ organizations[], pagination }`

### 34. Verify Organization (Admin Only)

- **POST** `/api/admin/organizations/:organizationId/verify`
- Verify an organization
- **Auth Required:** Admin
- **Response:** `{ organization }`

---

## 📤 File Upload Endpoints

### 35. Upload Evidence Files

- **POST** `/api/upload/evidence`
- Upload evidence files (images, documents)
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`
- **Body:** `files[] (multiple files), requestId?`
- **Response:** `{ files[] }`

### 36. Upload Profile Picture

- **POST** `/api/upload/profile-picture`
- Upload user profile picture
- **Auth Required:** Yes
- **Content-Type:** `multipart/form-data`
- **Body:** `file (single file)`
- **Response:** `{ profilePictureUrl }`

---

## 🔑 Authentication Header Format

For protected endpoints, include JWT token in header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📊 Test Credentials

**Admin:**

- Email: `admin@drin.org`
- Password: `admin123`

**Leader (Feni Rescue Team):**

- Email: `ahmed@fenirescue.org`
- Password: `password123`
- Organization Code: `FRT123`

**Member:**

- Email: `nurul@fenirescue.org`
- Password: `member123`

**Leader (Youth Supporters):**

- Email: `asif@youthsupporters.org`
- Password: `password123`
- Organization Code: `YS456`

---

## 📝 Example API Calls

### Login

```javascript
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@drin.org",
  "password": "admin123"
}
```

### Get All Zones

```javascript
GET http://localhost:5000/api/zones?severity=critical&limit=10
```

### Submit Assignment Request

```javascript
POST http://localhost:5000/api/assignment-requests
Authorization: Bearer <token>
Content-Type: application/json

{
  "zoneId": "zone-001",
  "proposedTeamSize": 15,
  "estimatedDuration": "7 days",
  "capabilities": "Medical aid, food distribution",
  "resources": "2 ambulances, medical supplies",
  "notes": "Ready for immediate deployment"
}
```

### Get Current User

```javascript
GET http://localhost:5000/api/auth/me
Authorization: Bearer <token>
```

---

## 🌐 CORS Configuration

Frontend URL allowed: `http://localhost:5173`

If your frontend runs on a different port, update the `FRONTEND_URL` in `.env` file.

---

## 📦 Response Format

### Success Response

```json
{
	"success": true,
	"data": {
		/* response data */
	}
}
```

### Error Response

```json
{
	"success": false,
	"error": {
		"code": "ERROR_CODE",
		"message": "Error message",
		"details": null
	}
}
```

### Error Codes

- `VALIDATION_ERROR` (400) - Missing or invalid fields
- `UNAUTHORIZED` (401) - Not authenticated or invalid credentials
- `FORBIDDEN` (403) - Insufficient permissions
- `NOT_FOUND` (404) - Resource not found
- `CONFLICT` (409) - Resource already exists
- `INTERNAL_SERVER_ERROR` (500) - Server error

---

## 🚀 Quick Start for Frontend Integration

1. **Set up environment variable in your frontend:**

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

2. **Create an API service:**

   ```javascript
   import axios from 'axios';

   const API = axios.create({
   	baseURL: import.meta.env.VITE_API_BASE_URL,
   });

   // Add token to requests
   API.interceptors.request.use(config => {
   	const token = localStorage.getItem('token');
   	if (token) {
   		config.headers.Authorization = `Bearer ${token}`;
   	}
   	return config;
   });

   export default API;
   ```

3. **Make API calls:**

   ```javascript
   import API from './services/api';

   // Login
   const { data } = await API.post('/auth/login', { email, password });
   localStorage.setItem('token', data.data.token);

   // Get zones
   const { data: zonesData } = await API.get('/zones');
   const zones = zonesData.data.zones;
   ```

---

## 🔧 Server Status

**Running on:** http://localhost:5000

**Health Check:** GET http://localhost:5000/api (returns `{ message: 'DRIN API is running' }`)
