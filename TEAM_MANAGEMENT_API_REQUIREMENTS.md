# Team Management API Requirements

## Overview

The Team Management feature requires backend APIs to handle user authentication, organization member management, and join request workflows. Below are the detailed API endpoints needed for full functionality.

---

## Required API Endpoints

### 1. **Get Current User**

- **Endpoint:** `GET /api/users/current`
- **Description:** Retrieves the currently authenticated user's information including their role and organization membership
- **Authentication:** Required (JWT token)
- **Response:**

```json
{
	"success": true,
	"data": {
		"id": 1,
		"fullName": "John Doe",
		"email": "john@example.com",
		"role": "leader", // "leader", "member", or "admin"
		"organizationId": 1,
		"createdAt": "2025-01-10T10:00:00Z"
	}
}
```

### 2. **Get Organization Details**

- **Endpoint:** `GET /api/organizations/:orgId`
- **Description:** Retrieves organization information
- **Authentication:** Required
- **Response:**

```json
{
	"success": true,
	"data": {
		"id": 1,
		"name": "Red Cross Team Alpha",
		"type": "ngo",
		"createdAt": "2024-12-01T00:00:00Z"
	}
}
```

### 3. **Get Organization Members**

- **Endpoint:** `GET /api/organizations/:orgId/members`
- **Description:** Retrieves all members of an organization
- **Authentication:** Required
- **Response:**

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"fullName": "John Doe",
			"email": "john@example.com",
			"role": "leader",
			"joinedAt": "2025-01-10T10:00:00Z"
		},
		{
			"id": 2,
			"fullName": "Jane Smith",
			"email": "jane@example.com",
			"role": "member",
			"joinedAt": "2025-02-15T14:30:00Z"
		}
	]
}
```

### 4. **Search Users by Name**

- **Endpoint:** `GET /api/users/search?query={searchTerm}`
- **Description:** Searches for users by name (for leaders to add members). Should exclude users already in the organization and return users not currently in any organization or allow cross-organization search based on business rules
- **Authentication:** Required (Leader only)
- **Query Parameters:**
  - `query` (string, required): Search term for user's full name (minimum 2 characters)
- **Response:**

```json
{
	"success": true,
	"data": [
		{
			"id": 10,
			"fullName": "Alice Cooper",
			"email": "alice@example.com"
		},
		{
			"id": 11,
			"fullName": "Bob Anderson",
			"email": "bob@example.com"
		}
	]
}
```

### 5. **Add Member to Organization**

- **Endpoint:** `POST /api/organizations/:orgId/members`
- **Description:** Directly adds a user to the organization (leader only)
- **Authentication:** Required (Leader only)
- **Request Body:**

```json
{
	"userId": 10
}
```

- **Response:**

```json
{
	"success": true,
	"message": "Member added successfully",
	"data": {
		"id": 10,
		"fullName": "Alice Cooper",
		"email": "alice@example.com",
		"role": "member",
		"joinedAt": "2025-12-23T15:00:00Z"
	}
}
```

### 6. **Update Member Role**

- **Endpoint:** `PUT /api/organizations/:orgId/members/:memberId/role`
- **Description:** Updates a member's role within the organization (leader only)
- **Authentication:** Required (Leader only)
- **Request Body:**

```json
{
	"role": "leader" // "leader" or "member"
}
```

- **Response:**

```json
{
	"success": true,
	"message": "Role updated successfully"
}
```

### 7. **Remove Member from Organization**

- **Endpoint:** `DELETE /api/organizations/:orgId/members/:memberId`
- **Description:** Removes a member from the organization (leader only)
- **Authentication:** Required (Leader only)
- **Response:**

```json
{
	"success": true,
	"message": "Member removed successfully"
}
```

### 8. **Send Join Request**

- **Endpoint:** `POST /api/organizations/:orgId/join-requests`
- **Description:** Allows a user to request to join an organization (non-leader/non-member)
- **Authentication:** Required
- **Request Body (optional):**

```json
{
	"message": "I would like to join your relief organization"
}
```

- **Response:**

```json
{
	"success": true,
	"message": "Join request sent successfully",
	"data": {
		"id": 1,
		"userId": 5,
		"organizationId": 1,
		"message": "I would like to join your relief organization",
		"status": "pending",
		"createdAt": "2025-12-23T15:00:00Z"
	}
}
```

### 9. **Get Join Requests**

- **Endpoint:** `GET /api/organizations/:orgId/join-requests`
- **Description:** Retrieves all pending join requests for an organization (leader only)
- **Authentication:** Required (Leader only)
- **Response:**

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"userId": 5,
			"userName": "Sarah Wilson",
			"userEmail": "sarah@example.com",
			"message": "I would like to join your relief organization",
			"status": "pending",
			"createdAt": "2025-12-22T10:00:00Z"
		},
		{
			"id": 2,
			"userId": 6,
			"userName": "Tom Brown",
			"userEmail": "tom@example.com",
			"message": "Experienced volunteer looking to help",
			"status": "pending",
			"createdAt": "2025-12-23T08:30:00Z"
		}
	]
}
```

### 10. **Approve Join Request**

- **Endpoint:** `PUT /api/organizations/:orgId/join-requests/:requestId/approve`
- **Description:** Approves a join request and adds the user to the organization (leader only)
- **Authentication:** Required (Leader only)
- **Response:**

```json
{
	"success": true,
	"message": "Join request approved",
	"data": {
		"id": 5,
		"fullName": "Sarah Wilson",
		"email": "sarah@example.com",
		"role": "member",
		"joinedAt": "2025-12-23T15:00:00Z"
	}
}
```

### 11. **Reject Join Request**

- **Endpoint:** `PUT /api/organizations/:orgId/join-requests/:requestId/reject`
- **Description:** Rejects a join request (leader only)
- **Authentication:** Required (Leader only)
- **Response:**

```json
{
	"success": true,
	"message": "Join request rejected"
}
```

---

## Authorization Rules

### Leaders Can:

- View all organization members
- Search and add new members directly
- Update member roles (promote to leader or demote to member)
- Remove members from organization
- View pending join requests
- Approve or reject join requests

### Non-Leader Members Can:

- View all organization members (read-only)
- Send join requests to other organizations (if not already in one)
- Cannot edit, delete, or manage other members

### General Users (Not in Organization) Can:

- Search for organizations to join
- Send join requests to organizations

---

## Error Responses

All endpoints should return appropriate error responses:

```json
{
	"success": false,
	"error": "Error message here"
}
```

**Common HTTP Status Codes:**

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or invalid token
- `403 Forbidden` - User doesn't have permission for this action
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., user already in organization)
- `500 Internal Server Error` - Server error

---

## Database Considerations

### Tables Needed:

1. **users** - Store user information
2. **organizations** - Store organization details
3. **organization_members** - Junction table linking users to organizations with roles
4. **join_requests** - Store pending join requests with status

### Key Relationships:

- A user can belong to one organization (or multiple, based on business rules)
- An organization can have multiple members
- Members have roles: "leader" (can manage) or "member" (read-only)
- Join requests link a user to an organization with pending status
