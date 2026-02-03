# Andhra Sewing Machines - Backend Documentation

## 1. Overview
The Murthy Sewing Machines backend is a Spring Boot application designed to handle e-commerce operations for sewing machines. It provides a RESTful API for user authentication, product management, order processing, and review management.

## 2. Tech Stack
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Security**: Spring Security with JWT (JSON Web Token)
- **Database**: MySQL 8.x
- **ORM**: Spring Data JPA / Hibernate
- **Image Hosting**: Cloudinary
- **Build Tool**: Maven

## 3. Database Schema
The system uses the `andhra_machines` database with the following primary entities:
- **User**: Stores customer information (id, name, email, password, phone, address).
- **Admin**: Stores administrator credentials and details.
- **Product**: Details about sewing machines (id, name, description, price, original price, image, stock, slug).
- **Order**: Customer orders (id, user_id, status, total_price, shipping_address, payment_status).
- **OrderItem**: Individual products within an order.
- **Review**: Customer feedback on products (id, product_id, user_id, rating, comment).
- **Blog**: Dynamic articles and guides (id, title, slug, excerpt, content, imageUrl, category).

## 4. Work Flow

### 4.1. Authentication Workflow
1. **Registration**: 
   - Users or Admins register via `/auth/register/user` or `/auth/register/admin`.
   - Passwords are encrypted using BCrypt before storage.
2. **Login**:
   - Users/Admins log in via `/auth/login/user` or `/auth/login/admin`.
   - On success, the backend generates a JWT token containing `userId` and `role`.
3. **Authorization**:
   - For protected routes (like `/api/orders`), the client must provide the JWT in the `Authorization: Bearer <token>` header.
   - The backend validates the token and extracts user details for processing requests.

### 4.2. Product Management Workflow
1. **Discovery**: Users can fetch all products or a single product by ID or slug.
2. **Admin Actions**: Only authorized admins can create, update, or delete products.

### 4.3. Order Lifecycle
1. **Placement**: Authenticated users submit an `OrderRequest` containing items and shipping details.
2. **Processing**: The `OrderService` validates stock, calculates totals, and persists the order.
3. **Status Updates**: Admins can update the order status (e.g., PENDING -> SHIPPED -> DELIVERED) via the Admin Panel.
4. **Notification**: Admins can mark orders as "WhatsApp Sent" to track communication with customers.

### 4.4. Review System
1. **Submission**: Authenticated users can post reviews for products they have experience with.
2. **Retrieval**: Reviews are fetched per product to display on the frontend.
3. **Management**: Reviews can be deleted by the product owner or admin.

---

## 5. API Details

### 5.1. Authentication (`/api/auth`)

#### Register User
- **POST** `/register/user`
- **Body**: `{ name, email, password, phone }`
- **Response**: `{ success, message, data: { id, name, email, phone, role, token } }`

#### Login User
- **POST** `/login/user`
- **Body**: `{ email, password }`
- **Response**: Same as registration (Success 200, Failure 401).

---

### 5.2. Products (`/api/products`)

#### Get All Products
- **GET** `/api/products`
- **Response**: `List<ProductResponse>`

#### Get Product by ID or Slug
- **GET** `/api/products/{id_or_slug}`
- **Response**: `ProductResponse`

#### Create Product (Admin Only)
- **POST** `/api/products`
- **Body**: `ProductRequest`
- **Response**: `ProductResponse` (Status 201)

---

### 5.3. Orders (`/api/orders`)

#### Create Order (Authenticated)
- **POST** `/api/orders`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `OrderRequest`
- **Response**: `{ success, message, data: OrderResponse }`

#### Get User Orders
- **GET** `/api/orders`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success, data: List<OrderResponse> }`

#### Get All Orders (Admin Only)
- **GET** `/api/orders/admin/all`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success, data: List<OrderResponse> }`

#### Update Order Status (Admin Only)
- **PUT** `/api/orders/{orderId}/status`
- **Body**: `{ "status": "SHIPPED" }`
- **Response**: `{ success, message, data: OrderResponse }`

---

### 5.4. Admin (`/api/admin`)

#### Get All Registered Users
- **GET** `/api/admin/users`
- **Response**: `{ success, data: List<UserSummary>, total }`

---

### 5.5. Blogs (`/api/blogs`)

#### Get All Blogs
- **GET** `/api/blogs`
- **Response**: `List<BlogResponse>`

#### Get Blog by Slug
- **GET** `/api/blogs/{slug}`
- **Response**: `BlogResponse`

#### Create Blog (Admin Only)
- **POST** `/api/blogs`
- **Body**: `BlogRequest`
- **Response**: `BlogResponse` (Status 201)

#### Update Blog (Admin Only)
- **PUT** `/api/blogs/{id}`
- **Body**: `BlogRequest`
- **Response**: `BlogResponse`

---

### 5.6. Newsletter (`/api/newsletter`)

#### Subscribe to Newsletter
- **POST** `/api/newsletter/subscribe`
- **Body**: `{ "email": "user@example.com" }`
- **Response**: `{ "success": true, "message": "Subscribed successfully" }`

---

### 5.7. Image Upload

#### Upload to Cloudinary
- **POST** `/api/products/upload`
- **Body**: `MultipartFile file`
- **Response**: `{ "url": "...", "message": "..." }`

---

## 6. Configuration & Setup

### Database Setup
Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/andhra_machines?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
```

### JWT Settings
```properties
jwt.secret=your_secret_key
jwt.expiration=86400000 (24 hours)
```

### Running the Application
1. Ensure MySQL is running.
2. Navigate to `backend` directory.
3. Run: `./mvnw spring-boot:run` (or `mvnw.cmd` on Windows).
4. Server starts on port **8080**.

---

## 7. Key Services
- **AuthService**: Handles registration, login, and password encryption.
- **ProductService**: Manages product CRUD and price scheduling.
- **BlogService**: Manages dynamic blog posts and categories.
- **OrderService**: Processes orders and manages status updates.
- **CloudinaryService**: Interfaces with Cloudinary API for image storage.
- **ReviewService**: Handles product reviews and ratings.

