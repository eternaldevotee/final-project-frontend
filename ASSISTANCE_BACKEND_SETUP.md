# Assistance Request Backend Setup Guide

## 🔴 Current Issue
- No data showing in the frontend
- Reply functionality not working
- Data should come from MySQL database

## 📍 Data Source
Your assistance requests are fetched from:
```
http://localhost:8083/admin/assistancerequests/all
```

**NOT from `http://localhost:9090`** - that's for travel packages!

## 🛠️ Backend Requirements

### 1. Spring Boot Backend Must Be Running
You need a Spring Boot application running on **port 8083** with these endpoints:

#### GET All Requests
```
GET http://localhost:8083/admin/assistancerequests/all
```
Returns: Array of assistance request objects

#### POST Admin Reply
```
POST http://localhost:8083/admin/assistancerequests/{requestId}/{reply}
```
Example: `POST http://localhost:8083/admin/assistancerequests/1/Thank%20you%20for%20contacting`

#### POST Close Request
```
POST http://localhost:8083/admin/assistancerequests/close/{requestId}
```
Example: `POST http://localhost:8083/admin/assistancerequests/close/1`

### 2. MySQL Database Schema

You need a table in MySQL for assistance requests:

```sql
CREATE TABLE assistance_requests (
    request_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    issue_description TEXT NOT NULL,
    request_status VARCHAR(50) DEFAULT 'OPEN',
    reply TEXT,
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolution_time TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 3. Sample Data to Insert

```sql
-- Insert some test data
INSERT INTO assistance_requests (user_id, issue_description, request_status) 
VALUES 
('test-user-123', 'I cannot access my booking details', 'OPEN'),
('test-user-456', 'Payment not processed correctly', 'OPEN'),
('test-user-789', 'Need help with package cancellation', 'CLOSED');
```

## 🧪 Testing Your Backend

### Test 1: Check if Backend is Running
Open Command Prompt and run:
```cmd
curl http://localhost:8083/admin/assistancerequests/all
```

**Expected:** JSON array of requests
**If Error:** Backend is not running or wrong port

### Test 2: Test Reply Endpoint
```cmd
curl -X POST http://localhost:8083/admin/assistancerequests/1/Test%20reply
```

**Expected:** Success message
**If Error:** Endpoint not implemented or wrong URL

### Test 3: Test Close Endpoint
```cmd
curl -X POST http://localhost:8083/admin/assistancerequests/close/1
```

**Expected:** Success message
**If Error:** Endpoint not implemented

## 📋 Backend Controller Code You Need

Your Spring Boot backend should have this controller:

```java
@RestController
@RequestMapping("/admin/assistancerequests")
@CrossOrigin(origins = "http://localhost:4200")
public class AssistanceRequestController {
    
    @Autowired
    private AssistanceRequestService assistanceService;
    
    @GetMapping("/all")
    public ResponseEntity<List<AssistanceRequestDTO>> getAllRequests() {
        return ResponseEntity.ok(assistanceService.getAllRequests());
    }
    
    @PostMapping("/{requestId}/{reply}")
    public ResponseEntity<String> adminReply(
            @PathVariable Long requestId, 
            @PathVariable String reply) {
        assistanceService.addReply(requestId, reply);
        return ResponseEntity.ok("Reply sent successfully");
    }
    
    @PostMapping("/close/{requestId}")
    public ResponseEntity<String> closeRequest(@PathVariable Long requestId) {
        assistanceService.closeRequest(requestId);
        return ResponseEntity.ok("Request closed successfully");
    }
}
```

## 🔧 Quick Fix Checklist

### ✅ Backend Checklist:
1. [ ] Spring Boot app running on port 8083
2. [ ] MySQL database running
3. [ ] `assistance_requests` table exists
4. [ ] Sample data inserted in table
5. [ ] Controller endpoints implemented
6. [ ] CORS enabled for `http://localhost:4200`

### ✅ Database Checklist:
1. [ ] MySQL service is running
2. [ ] Database connection configured in `application.properties`
3. [ ] Table `assistance_requests` exists
4. [ ] Foreign key to `users` table is valid
5. [ ] At least one test record exists

### ✅ Frontend Checklist:
1. [ ] Angular dev server running on port 4200
2. [ ] No console errors in browser (F12)
3. [ ] Network tab shows API calls being made

## 🚀 Steps to Debug Right Now

### Step 1: Check Backend Console
Look at your Spring Boot console when you load the page. You should see:
```
GET /admin/assistancerequests/all
```

### Step 2: Check Browser Console
Open Developer Tools (F12) and look for:
```
Fetching requests from: http://localhost:8083/admin/assistancerequests/all
Received requests: [...]
```

### Step 3: Check Network Tab
In browser DevTools > Network tab:
- Look for request to `assistancerequests/all`
- Check if it's 200 OK or error (404, 500, etc.)
- Click on it to see the response

### Step 4: Verify MySQL Data
Open MySQL Workbench or command line:
```sql
USE your_database_name;
SELECT * FROM assistance_requests;
```

## 📊 Expected Response Format

The backend should return JSON like this:

```json
[
  {
    "requestId": 1,
    "user": {
      "userID": "test-user-123",
      "name": "Test User",
      "email": "test@example.com"
    },
    "issueDescription": "I cannot access my booking details",
    "requestStatus": "OPEN",
    "reply": null,
    "creationTime": "2025-11-05T10:30:00",
    "resolutionTime": null
  }
]
```

## 🆘 Common Errors and Solutions

### Error: "Failed to load requests: Server error"
**Cause:** Backend not running or wrong port
**Solution:** Start Spring Boot app on port 8083

### Error: "No assistance requests found"
**Cause:** Database is empty
**Solution:** Insert sample data using SQL above

### Error: "CORS policy error"
**Cause:** Backend not allowing Angular origin
**Solution:** Add `@CrossOrigin(origins = "http://localhost:4200")` to controller

### Error: "404 Not Found"
**Cause:** Endpoint URL doesn't match backend route
**Solution:** Check controller mapping matches the URLs in service

## 📞 Need Help?

Check these in order:
1. Backend Spring Boot console logs
2. Browser console (F12)
3. Network tab in DevTools
4. MySQL database content
5. Share the exact error message from any of the above

