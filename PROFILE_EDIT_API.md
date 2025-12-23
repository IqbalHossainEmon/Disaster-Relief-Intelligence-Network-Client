# Profile Edit API Documentation

## Overview

This API allows users to view and update their profile information from the navbar profile section.

---

## 🔐 Authentication Status

- **Currently**: Authentication is **disabled** for development
- **Production**: Will require JWT token
- **When enabled**: Add `Authorization: Bearer <token>` header

---

## 📋 Available Profile APIs

### 1. Get Current User Profile

**Endpoint:** `GET /api/auth/me`

**Description:** Retrieve the logged-in user's profile information

**Headers:**

```
Authorization: Bearer <jwt-token>  (when auth is enabled)
```

**Response (Success):**

```json
{
	"success": true,
	"data": {
		"user": {
			"id": "user-001",
			"fullName": "Ahmed Hossain",
			"email": "ahmed@fenirescue.org",
			"role": "leader",
			"organizationId": "org-001",
			"phone": "+880 1712345678",
			"profilePictureUrl": null,
			"isVerified": true,
			"isActive": true,
			"createdAt": "2025-04-01T08:00:00Z",
			"updatedAt": "2025-05-10T09:00:00Z",
			"lastLogin": "2025-05-10T09:00:00Z"
		},
		"organization": {
			"id": "org-001",
			"name": "Feni Rescue Team",
			"organizationType": "volunteer",
			"description": "Dedicated volunteer group helping flood victims",
			"leaderId": "user-001",
			"contactPhone": "+880 1712345678",
			"address": "House 45, Road 12, Feni City",
			"invitationCode": "FRT123",
			"volunteerCount": 50,
			"establishedYear": 2020,
			"expertise": "Medical aid, Food distribution",
			"isVerified": true,
			"isActive": true
		}
	}
}
```

---

### 2. Update Profile

**Endpoint:** `PATCH /api/auth/profile`

**Description:** Update user profile information

**Headers:**

```
Authorization: Bearer <jwt-token>  (when auth is enabled)
Content-Type: application/json
```

**Request Body:**

```json
{
	"fullName": "Ahmed Hossain Updated",
	"phone": "+880 1712345679",
	"profilePictureUrl": "http://localhost:5000/uploads/profile-pic.jpg"
}
```

**Fields (All Optional):**

- `fullName` (string) - User's full name
- `phone` (string) - Phone number with country code
- `profilePictureUrl` (string) - URL to profile picture (after uploading)

**Response (Success):**

```json
{
	"success": true,
	"data": {
		"user": {
			"id": "user-001",
			"fullName": "Ahmed Hossain Updated",
			"email": "ahmed@fenirescue.org",
			"role": "leader",
			"organizationId": "org-001",
			"phone": "+880 1712345679",
			"profilePictureUrl": "http://localhost:5000/uploads/profile-pic.jpg",
			"isVerified": true,
			"isActive": true,
			"createdAt": "2025-04-01T08:00:00Z",
			"updatedAt": "2025-12-23T12:00:00Z",
			"lastLogin": "2025-05-10T09:00:00Z"
		}
	}
}
```

**Response (Error - User Not Found):**

```json
{
	"success": false,
	"error": {
		"code": "NOT_FOUND",
		"message": "User not found"
	}
}
```

---

### 3. Upload Profile Picture

**Endpoint:** `POST /api/upload/profile-picture`

**Description:** Upload a new profile picture

**Headers:**

```
Authorization: Bearer <jwt-token>  (when auth is enabled)
Content-Type: multipart/form-data
```

**Form Data:**

- `file` - Image file (JPEG, PNG, GIF, WEBP)

**Limits:**

- Max file size: 100MB
- Allowed types: JPEG, JPG, PNG, GIF, WEBP

**Response (Success):**

```json
{
	"success": true,
	"data": {
		"profilePictureUrl": "http://localhost:5000/uploads/uuid-filename.jpg"
	}
}
```

**Next Step:** Use the returned `profilePictureUrl` to update profile

---

## 🎯 Complete Profile Edit Workflow

### Step 1: Get Current Profile

```bash
curl http://localhost:5000/api/auth/me
```

### Step 2: Upload New Profile Picture (Optional)

```bash
curl -X POST http://localhost:5000/api/upload/profile-picture \
  -F "file=@my-photo.jpg"
```

**Response:**

```json
{
	"success": true,
	"data": {
		"profilePictureUrl": "http://localhost:5000/uploads/abc123.jpg"
	}
}
```

### Step 3: Update Profile Information

```bash
curl -X PATCH http://localhost:5000/api/auth/profile \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Ahmed Hossain",
    "phone": "+880 1712345679",
    "profilePictureUrl": "http://localhost:5000/uploads/abc123.jpg"
  }'
```

---

## 💻 Frontend Implementation Guide

### React/JavaScript Example

```javascript
// 1. Get current user profile
const getCurrentProfile = async () => {
	try {
		const response = await fetch('http://localhost:5000/api/auth/me', {
			headers: {
				// When auth is enabled:
				// 'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
		});
		const data = await response.json();

		if (data.success) {
			console.log('User:', data.data.user);
			console.log('Organization:', data.data.organization);
			return data.data.user;
		}
	} catch (error) {
		console.error('Error fetching profile:', error);
	}
};

// 2. Upload profile picture
const uploadProfilePicture = async file => {
	try {
		const formData = new FormData();
		formData.append('file', file);

		const response = await fetch('http://localhost:5000/api/upload/profile-picture', {
			method: 'POST',
			body: formData,
			// When auth is enabled:
			// headers: {
			//   'Authorization': `Bearer ${localStorage.getItem('token')}`
			// }
		});
		const data = await response.json();

		if (data.success) {
			return data.data.profilePictureUrl;
		}
	} catch (error) {
		console.error('Error uploading picture:', error);
	}
};

// 3. Update profile
const updateProfile = async profileData => {
	try {
		const response = await fetch('http://localhost:5000/api/auth/profile', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				// When auth is enabled:
				// 'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(profileData),
		});
		const data = await response.json();

		if (data.success) {
			console.log('Profile updated:', data.data.user);
			return data.data.user;
		}
	} catch (error) {
		console.error('Error updating profile:', error);
	}
};

// 4. Complete workflow
const handleProfileUpdate = async (fullName, phone, profilePicFile) => {
	// Upload picture if provided
	let profilePictureUrl = null;
	if (profilePicFile) {
		profilePictureUrl = await uploadProfilePicture(profilePicFile);
	}

	// Update profile
	const updatedUser = await updateProfile({
		fullName,
		phone,
		...(profilePictureUrl && { profilePictureUrl }),
	});

	return updatedUser;
};
```

---

## 🎨 Navbar Profile Edit UI Components

### Editable Fields

1. **Full Name** (text input)
2. **Phone Number** (text input with validation)
3. **Profile Picture** (file upload)

### Read-Only Information

- Email (cannot be changed)
- Role (admin/leader/member)
- Organization Name
- Account Status (verified/active)
- Join Date

---

## 📝 Validation Rules

### Full Name

- **Required**: No (optional in update)
- **Min Length**: 2 characters
- **Max Length**: 100 characters
- **Format**: Letters, spaces, and common characters

### Phone Number

- **Required**: No (optional in update)
- **Format**: International format recommended (e.g., +880 1712345678)
- **Pattern**: `+[country-code] [number]`

### Profile Picture

- **File Types**: JPEG, JPG, PNG, GIF, WEBP
- **Max Size**: 100MB
- **Recommended**: Square aspect ratio (1:1)
- **Recommended Size**: 500x500 pixels minimum

---

## 🧪 Testing

### Test Account

```
Email: ahmed@fenirescue.org
Password: password123
Role: leader
Organization: Feni Rescue Team
```

### Test Commands

**1. Get Profile:**

```bash
curl http://localhost:5000/api/auth/me
```

**2. Upload Picture:**

```bash
curl -X POST http://localhost:5000/api/upload/profile-picture \
  -F "file=@test-photo.jpg"
```

**3. Update Profile:**

```bash
curl -X PATCH http://localhost:5000/api/auth/profile \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Ahmed Hossain Updated",
    "phone": "+880 1712345679"
  }'
```

---

## 🚨 Error Handling

### Common Errors

**User Not Found (404)**

```json
{
	"success": false,
	"error": {
		"code": "NOT_FOUND",
		"message": "User not found"
	}
}
```

**Unauthorized (401)** - When auth is enabled

```json
{
	"success": false,
	"error": {
		"code": "UNAUTHORIZED",
		"message": "Invalid or expired token"
	}
}
```

**Invalid File Type (400)**

```json
{
	"success": false,
	"error": {
		"code": "VALIDATION_ERROR",
		"message": "Invalid file type. Allowed: Images (JPEG, PNG, GIF, WEBP)"
	}
}
```

**File Too Large (413)**

```json
{
	"success": false,
	"error": {
		"code": "FILE_TOO_LARGE",
		"message": "File size exceeds 100MB limit"
	}
}
```

---

## 📊 Profile Data Structure

### User Profile Schema

```typescript
interface User {
	id: string;
	fullName: string;
	email: string; // READ-ONLY
	passwordHash: string; // NEVER RETURNED
	role: 'admin' | 'leader' | 'member'; // READ-ONLY
	organizationId: string | null; // READ-ONLY
	phone: string | null; // EDITABLE
	profilePictureUrl: string | null; // EDITABLE
	isVerified: boolean; // READ-ONLY
	isActive: boolean; // READ-ONLY
	createdAt: string; // READ-ONLY
	updatedAt: string; // AUTO-UPDATED
	lastLogin: string; // AUTO-UPDATED
}
```

---

## 🔒 Security Considerations

### Current State (Auth Disabled)

- ✅ All endpoints accessible without token
- ✅ Good for development and testing
- ⚠️ **Do not deploy to production** without enabling auth

### Production State (Auth Enabled)

1. Enable authentication in routes
2. Uncomment `authenticate` middleware
3. Require JWT token in all requests
4. Validate token expiration
5. Check user permissions

---

## 🎯 Frontend Integration Checklist

- [ ] Create profile edit form component
- [ ] Add form validation (name, phone)
- [ ] Implement file upload for profile picture
- [ ] Show preview of uploaded picture
- [ ] Handle loading states
- [ ] Display success/error messages
- [ ] Update navbar with new profile info
- [ ] Refresh user data after update
- [ ] Store profile picture URL in state
- [ ] Handle authentication headers (when enabled)

---

## 📱 Responsive Design Tips

### Mobile View

- Stack form fields vertically
- Large touch-friendly buttons
- Easy file picker access
- Clear validation messages

### Desktop View

- Side-by-side layout (picture + form)
- Instant preview of changes
- Keyboard shortcuts
- Drag-and-drop file upload

---

## 🔄 Data Flow

```
Navbar Profile Icon Click
    ↓
Load Current Profile (GET /api/auth/me)
    ↓
Display Profile Edit Modal/Page
    ↓
User Edits Information
    ↓
User Selects Profile Picture
    ↓
Upload Picture (POST /api/upload/profile-picture)
    ↓
Receive Picture URL
    ↓
Submit Form (PATCH /api/auth/profile)
    ↓
Success Response
    ↓
Update Navbar with New Info
    ↓
Close Modal/Navigate Away
```

---

## ✅ API Status

| Endpoint                      | Method | Status     | Auth Required |
| ----------------------------- | ------ | ---------- | ------------- |
| `/api/auth/me`                | GET    | ✅ Working | Currently No  |
| `/api/auth/profile`           | PATCH  | ✅ Working | Currently No  |
| `/api/upload/profile-picture` | POST   | ✅ Working | Currently No  |

---

## 📞 Support

**API Base URL:** http://localhost:5000  
**Documentation:** See [API_ENDPOINTS.md](API_ENDPOINTS.md) for all endpoints  
**Last Updated:** December 23, 2025

---

**Ready to implement!** 🚀

The backend APIs are fully functional and ready for frontend integration.
