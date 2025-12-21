# COMPREHENSIVE BACKEND DEVELOPMENT PROMPT FOR DRIN

## Project Context

I need you to build a complete, production-ready backend API for the **Disaster Relief Intelligence Network (DRIN)** - a platform for coordinating disaster relief operations, managing teams, tracking disaster zones, and facilitating resource distribution during natural disasters.

This is a critical system used by government agencies, NGOs, volunteer organizations, and community groups to coordinate relief efforts during floods, earthquakes, and other disasters in Bangladesh.

---

## What I Have Already

I have a **fully functional React frontend** with the following features:

- Home page with hero section and features
- Authentication (Login/Signup) with multi-step registration for organizations
- Interactive disaster map showing multiple zones with severity levels
- Zone details pages with relief needs, statistics, and team assignments
- Admin dashboard for managing assignment requests, users, and zones
- Real-time zone selection and statistics display

The frontend is currently using **mock data** from a local file. I need you to build the backend that will replace this mock data with a real database and API.

---

## Your Task

Build a **complete, scalable, secure backend system** with the following:

### Core Requirements:

1. **RESTful API** with all endpoints specified in the documentation
2. **JSON File Storage** for data persistence
3. **JWT authentication** with role-based access control (Admin, Leader, Member)
4. **File upload system** for evidence/documents (local file storage)
5. **Real-time updates** using WebSockets/Socket.io (optional for MVP)
6. **Basic error handling**
7. **Seed data** for testing

### Technology Stack:

**Fixed Stack:**

- **Node.js + Express.js**
- **File System (JSON files)** for data storage
- **JWT** for authentication
- **Socket.io** for real-time features (optional)

---

## Documentation Provided

I'm providing you with **TWO comprehensive documents**:

### 1. BACKEND_SPECIFICATION.md

This contains:

- Complete JSON file storage structure with all data relationships
- All 39 REST API endpoints with request/response examples
- Authentication and authorization specifications
- WebSocket events for real-time features (optional)
- Basic security requirements (CORS, JWT)
- Environment variables needed
- Error handling standards
- Manual testing approach
- Basic deployment considerations

### 2. BACKEND_DUMMY_DATA_EXAMPLES.md

This contains:

- Sample data for all database tables in JSON format
- Example users (Admin, Leaders, Members)
- Sample organizations (5 different types)
- Disaster zones with coordinates and severity levels
- Relief needs categorized by type
- Assignment requests (pending, approved, rejected)
- Evidence files, contributions, notifications
- SQL seed script examples
- API request/response examples
- Testing credentials

---

## Step-by-Step Implementation Plan

Please follow this structured approach:

### Phase 1: Project Setup (Day 1)

1. Initialize Node.js project with Express
2. Install required dependencies (express, jsonwebtoken, bcrypt, cors, multer)
3. Set up environment variables (.env file)
4. Create project folder structure:
   ```
   /src
     /config
     /controllers
     /routes
     /middleware
     /utils
   /data (JSON files for storage)
   /uploads (uploaded files)
   ```

### Phase 2: Data Storage Setup (Day 1)

1. Create JSON file structure for data storage
2. Set up utility functions for reading/writing JSON files
3. Create initial data files with seed data:
   - users.json
   - organizations.json
   - zones.json
   - assignmentRequests.json
   - assignments.json
   - contributions.json
   - notifications.json
4. Implement helper functions for CRUD operations on JSON files

### Phase 3: Core Authentication (Day 2-3)

1. Implement user registration (both Leader and Member flows)
2. Implement organization creation/joining
3. Implement login with JWT token generation
4. Create authentication middleware
5. Implement role-based authorization middleware
6. Add refresh token mechanism
7. Implement password reset functionality

### Phase 4: Main API Endpoints (Day 3-7)

Implement endpoints in this order:

**Day 3:**

- User management endpoints (profile, update)
- Organization endpoints (details, members, update)

**Day 4:**

- Disaster zones endpoints (CRUD, list, filter)
- Zone statistics endpoints
- Overall statistics endpoint

**Day 5:**

- Relief needs endpoints (list, update)
- Assignment request submission
- Assignment request listing

**Day 6:**

- Assignment approval/rejection (Admin)
- Zone assignments management
- Contribution history recording

**Day 7:**

- Notifications system
- Admin dashboard statistics
- Search functionality

### Phase 5: File Upload (Day 5)

1. Create /uploads directory structure
2. Set up Multer for local file storage
3. Add basic file type validation
4. Create evidence file upload endpoint
5. Implement file URL generation

### Phase 6: Real-time Features (Day 6 - Optional)

1. Set up Socket.io server
2. Implement room-based event system
3. Add zone update broadcasts
4. Add assignment status change events
5. Implement real-time notifications
6. Test WebSocket connections

### Phase 7: CORS Setup (Day 6)

1. Add CORS configuration for frontend access
2. Basic error handling middleware
3. Environment variables setup

### Phase 9: Manual Testing (Day 9)

1. Test all API endpoints with Postman/Thunder Client
2. Test authentication flows
3. Test file uploads
4. Verify all CRUD operations work correctly

### Phase 10: Documentation (Day 10)

1. Create simple README with API endpoints
2. Document how to run the server
3. List all available endpoints with examples

---

## Critical Implementation Details

### 1. File System Storage

- Store data in JSON files in `/data` directory
- Use **UUID** for all entity IDs (generate with `crypto.randomUUID()`)
- Store coordinates as simple `[latitude, longitude]` arrays
- Each entity type has its own JSON file
- Use helper functions to read/write files synchronously or with promises

### 2. Authentication Flow

- Hash passwords with **bcrypt** (salt rounds: 10)
- Generate **JWT tokens** with 24-hour expiration
- Include userId, email, role, organizationId in JWT payload
- Store refresh tokens in **httpOnly cookies**
- Implement **token refresh** endpoint

### 3. Organization Registration

For **Leaders** (creating organization):

- Create organization first
- Generate unique 6-character invitation code
- Create user and link to organization
- Return both user and organization data

For **Members** (joining organization):

- Validate invitation code
- Create user linked to existing organization
- Notify organization leader

### 4. File Upload Implementation

- Accept **multipart/form-data**
- Validate file types (jpg, jpeg, png, pdf only)
- Limit file size to **5MB per file**
- Generate unique filenames using UUID
- Return CDN URLs in response
- Store file metadata in database

### 5. Real-time Events

Implement these Socket.io events:

- `zone_updated` - when zone severity/stats change
- `new_assignment_request` - when new request submitted (admin only)
- `assignment_status_changed` - when request approved/rejected
- `relief_needs_updated` - when needs quantities updated
- `new_notification` - when user receives notification

### 6. API Response Format

**Success:**

```json
{
	"success": true,
	"data": {
		/* response data */
	},
	"message": "Optional success message"
}
```

**Error:**

```json
{
	"success": false,
	"error": {
		"code": "ERROR_CODE",
		"message": "Error message",
		"details": [
			/* validation errors */
		]
	}
}
```

### 7. Pagination

For list endpoints, implement:

```javascript
{
  "data": [ /* items */ ],
  "pagination": {
    "total": 120,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## Special Features to Implement

### 1. Zone Distance Calculation (Optional)

If needed, use Haversine formula in JavaScript or skip for MVP

### 2. Relief Needs Aggregation

Calculate percentage met for each relief need:

```javascript
percentageMet = (quantityDelivered / quantityNeeded) * 100;
```

### 3. Dashboard Statistics

Implement efficient queries for:

- Total zones by severity
- Pending/approved/rejected requests count
- Active assignments count
- Recent activity feed (last 10 actions)
- Contribution statistics

### 4. Notification System

Auto-generate notifications for:

- Assignment request status changes
- Zone severity updates
- New team members joining
- Contribution milestones

### 5. Search Functionality

Implement simple search using JavaScript:

- Filter arrays based on search terms
- Use `.includes()` or `.toLowerCase().includes()` for case-insensitive search
- Search across zone names, locations, organization names

---

## Environment Variables Template

Create a `.env` file with:

```env
# Server
PORT=5000

# JWT
JWT_SECRET=3rt5#3!@#sc0q$#F8@$@#df3$#fWf2few
JWT_EXPIRES_IN=24h

# Frontend
FRONTEND_URL=http://localhost:5173

# File Paths
DATA_DIR=./data
UPLOADS_DIR=./uploads
```

---

## Testing Requirements

### Unit Tests

Write tests for:

- Authentication service (register, login, token generation)
- Organization service (create, join, validate code)
- Zone service (CRUD operations, distance calculations)
- Assignment service (create, approve, reject)
- File upload service
- Notification service

### Integration Tests

Write tests for:

- Complete registration flow (leader and member)
- Login and token refresh
- Zone creation and retrieval
- Assignment request submission and approval
- File upload with validation
- WebSocket connection and events

### Test Coverage Goal

- **Minimum 80% code coverage**
- Test both success and error cases
- Mock external services (S3, SendGrid)

---

## Code Quality Standards

### Follow these principles:

1. **Clean Code**: Use meaningful variable/function names
2. **DRY**: Don't repeat yourself
3. **SOLID Principles**: Especially Single Responsibility
4. **Error Handling**: Always handle errors gracefully
5. **Basic Validation**: Check required fields before processing
6. **Security**: Use JWT properly, secure routes
7. **Comments**: Add comments for complex logic only

### Project Structure Example:

```
src/
├── config/
│   └── env.js
├── data/
│   ├── users.json
│   ├── organizations.json
│   ├── zones.json
│   └── ...
├── utils/
│   └── dataHelpers.js (readData, writeData, create, findById, etc.)
├── controllers/
│   ├── authController.js
│   ├── zoneController.js
│   ├── assignmentController.js
│   └── ...
├── services/
│   ├── authService.js
│   ├── zoneService.js
│   ├── fileService.js
│   └── ...
├── routes/
│   ├── authRoutes.js
│   ├── zoneRoutes.js
│   └── ...
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── upload.js
├── uploads/
│   └── (uploaded files)
├── package.json
├── .env
└── server.js
```

---

## Deliverables Expected

When you complete this backend, I expect:

1. **✅ Fully functional REST API** with all 39 endpoints
2. **✅ Database schema** created with migrations
3. **✅ Seed scripts** with dummy data populated
4. **✅ Project initialized** with dependencies
5. **✅ JSON file storage** structure created
6. **✅ All 39 API endpoints** implemented
7. **✅ Authentication system** with JWT and role-based access
8. **✅ File upload** working with local storage
9. **✅ CORS** configured for frontend
10. **✅ Error handling** middleware
11. **✅ Basic README** with setup instructions
12. **✅ Postman collection** for testing
13. **✅ Environment configuration** documented

**Optional:**

- WebSocket server for real-time updates
- API documentation with Swagger
- Automated tests

---

## Success Criteria

The backend is considered complete when:

1. ✅ Frontend can successfully authenticate users
2. ✅ Frontend can fetch and display all disaster zones
3. ✅ Frontend can view zone details with relief needs
4. ✅ Leaders can submit assignment requests
5. ✅ Admin can approve/reject requests
6. ✅ File uploads work for evidence submission
7. ✅ All endpoints tested with Postman
8. ✅ Notifications are delivered to users
9. ✅ All API endpoints return proper responses
10. ✅ System handles errors gracefully
11. ✅ Tests pass successfully
12. ✅ API documentation is accessible

---

## Important Notes

### Coordinates Storage

- Store as object: `{"lat": 23.0239, "lng": 91.3996}`
- Frontend uses Leaflet format: `[latitude, longitude]`
- Convert between formats as needed in your API

### Organization Invitation Codes

- Generate random 6-character alphanumeric codes
- Make them case-insensitive for user convenience
- Check uniqueness in organizations.json before creating
- Provide "regenerate code" functionality for leaders

### Assignment Request Flow

1. Leader submits request with team members and evidence
2. Save to assignment_requests.json with status "pending"
3. Admin reviews in dashboard
4. Admin approves → Update status to "approved", update zones.json with hasAssignedTeam, notify leader
5. Admin rejects → Update status to "rejected", store rejection reason, notify leader

### Zone Updates

- When zone severity changes, broadcast to connected clients (if using Socket.io)
- When relief needs updated, recalculate statistics in zone_statistics.json
- When assignment approved, update zone's hasAssignedTeam flag in zones.json

### Performance Considerations

- Use database indexes on foreign keys
- Implement connection pooling

---

## Getting Started

1. **Read all 3 documentation files thoroughly**
2. **Set up your development environment** (Node.js, VS Code)
3. **Initialize the project** with npm and folder structure
4. **Start with Phase 1** and work through sequentially
5. **Test each feature** with Postman before moving to the next
6. **Focus on MVP** - skip optional features for now

---

## Additional Context

This system will be used in **real disaster situations** where:

- Lives depend on accurate information
- Multiple organizations need to coordinate
- Quick implementation is critical for MVP
- System needs to work reliably with simple architecture

Therefore:

- **Security is critical** - implement all security measures
- **Performance matters** - optimize database queries
- **Reliability is key** - handle all edge cases
- **Data accuracy** - validate all inputs thoroughly
- **Scalability** - design for growth

---

## Reference Documents

1. **BACKEND_SPECIFICATION.md** - Complete technical specification
2. **BACKEND_DUMMY_DATA_EXAMPLES.md** - Sample data for all tables

Please refer to these documents for:

- Exact database column names and types
- Complete API endpoint specifications
- Request/response payload structures
- Sample data for testing
- Security requirements
- All technical details

---

## Final Notes

This is a **comprehensive, production-ready system** that requires:

- Attention to detail
- Security best practices
- Clean, maintainable code
- Thorough testing
- Complete documentation

Take your time to build it properly. Quality is more important than speed.

**Estimated development time: 10-14 days for a complete, tested, documented backend.**

Good luck! 🚀

---

## Start Building!

You now have all the information needed to build this backend:

- **Stack**: Node.js + Express.js + JWT + JSON files
- **Storage**: Local file system for both data and uploads
- **Focus**: MVP with core features, skip optional items
- **Testing**: Manual testing with Postman

Once you understand the requirements, begin with Phase 1: Project Setup and work through each phase systematically.
