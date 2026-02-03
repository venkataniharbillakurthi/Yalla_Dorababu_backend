# Authentication API Documentation

## Base URL
```
http://localhost:8080/api
```

## Database Schema
- **Database Name**: `andhra_machines`
- **Tables**: 
  - `users` - For regular user accounts
  - `admins` - For admin accounts

---

## API Endpoints

### 1. Register User
**POST** `/auth/register/user`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "phone": "+91 9876543210"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "phone": "+91 9876543210",
    "role": "USER",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Email already exists",
  "data": null
}
```

---

### 2. Register Admin
**POST** `/auth/register/admin`

**Request Body:**
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "phone": "+91 9876543211"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "phone": "+91 9876543211",
    "role": "ADMIN",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Email already exists",
  "data": null
}
```

---

### 3. Login User
**POST** `/auth/login/user`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "phone": "+91 9876543210",
    "role": "USER",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid email or password",
  "data": null
}
```

---

### 4. Login Admin
**POST** `/auth/login/admin`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "phone": "+91 9876543211",
    "role": "ADMIN",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid email or password",
  "data": null
}
```

---

## Postman Collection Setup

### Step 1: Create a User Account
1. Method: **POST**
2. URL: `http://localhost:8080/api/auth/register/user`
3. Headers:
   - `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "test123",
  "phone": "+91 9876543210"
}
```

### Step 2: Create an Admin Account
1. Method: **POST**
2. URL: `http://localhost:8080/api/auth/register/admin`
3. Headers:
   - `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "Test Admin",
  "email": "testadmin@example.com",
  "password": "admin123",
  "phone": "+91 9876543211"
}
```

### Step 3: Test User Login
1. Method: **POST**
2. URL: `http://localhost:8080/api/auth/login/user`
3. Headers:
   - `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "email": "testuser@example.com",
  "password": "test123"
}
```

### Step 4: Test Admin Login
1. Method: **POST**
2. URL: `http://localhost:8080/api/auth/login/admin`
3. Headers:
   - `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "email": "testadmin@example.com",
  "password": "admin123"
}
```

---

## Frontend Routes

- **Login Page**: `http://localhost:5173/login`
- **Signup Page**: `http://localhost:5173/signup`

Both pages support switching between User and Admin registration/login.

---

## Database Configuration

Update `backend/src/main/resources/application.properties` with your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/andhra_machines?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
```

The database and tables will be created automatically on first run.

---

## Notes

1. **No Default Users**: The system does not create any default users. You must register accounts using the API.
2. **Password Requirements**: Minimum 6 characters
3. **Email Validation**: Must be a valid email format
4. **JWT Token**: Tokens are returned in the response and should be stored for authenticated requests
5. **Password Encryption**: All passwords are encrypted using BCrypt before storage

