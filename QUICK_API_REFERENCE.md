# 🚀 Quick Start - Using the API

## Import Services

```javascript
import { authService, zoneService, assignmentService, adminService, uploadService } from '../services';
```

## Authentication

```javascript
// Login
const { user, token } = await authService.login(email, password);

// Check if logged in
const isLoggedIn = authService.isAuthenticated();

// Get current user
const user = authService.getStoredUser();

// Logout
authService.logout();
```

## Fetch Data

```javascript
// Get all zones
const { zones } = await zoneService.getAllZones();

// Get zone details
const zoneData = await zoneService.getZoneDetails(zoneId);

// Get statistics
const stats = await zoneService.getOverallStatistics();

// Get assignment requests
const { requests } = await assignmentService.getRequests({ status: 'pending' });
```

## Submit Data

```javascript
// Submit assignment request
await assignmentService.submitRequest({
	zoneId,
	proposedTeamSize: 15,
	estimatedDuration: '7 days',
	capabilities: 'Medical aid, food distribution',
});

// Approve request (Admin)
await assignmentService.approveRequest(requestId, 'Approved!');

// Upload files
await uploadService.uploadEvidence(files);
```

## Component Template

```javascript
import { useState, useEffect } from 'react';
import { zoneService } from '../services';

function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await zoneService.getAllZones();
      setData(response.zones);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  return <div>{data.map(...)}</div>;
}
```

## Test Credentials

```javascript
Admin:  admin@drin.org / admin123
Leader: ahmed@fenirescue.org / password123
Member: nurul@fenirescue.org / member123
```

## API Base URL

Make sure `.env` has:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

That's it! 🎉
