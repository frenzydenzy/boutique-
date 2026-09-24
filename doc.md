# Boutique Exhibition Platform — Backend Development Log

## 📌 Project Overview

This project is a backend system for a Boutique Designer Exhibition Platform.
It allows users to browse designer clothes, manage profiles, create wishlists, submit reviews, and enables admin moderation and role-based access.

---

# 🏗️ Tech Stack Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Postman (API Testing)

---

# ✅ Phase 1 — Backend Setup

### ✔ Project Initialization

* Created Node.js project using npm
* Installed dependencies:

  * express
  * mongoose
  * dotenv
  * cors
  * bcryptjs
  * jsonwebtoken
  * multer
  * nodemon

### ✔ Server Configuration

* Created `server.js`
* Connected MongoDB locally
* Set up middleware:

  * JSON parsing
  * CORS

---

# 👤 Phase 2 — Authentication System

## Features Implemented:

* User Registration
* Password Hashing using bcrypt
* Login with JWT Token
* Protected Routes Middleware

### Models Created:

* User Model

### APIs Built:

* POST /api/users/register
* POST /api/users/login
* GET /api/users/profile (protected)

---

# 🔐 Phase 3 — Role-Based Authorization

## Roles Defined:

* user
* designer (contributors)
* admin

## Middleware Created:

* protect (authentication)
* authorizeRoles (role-based access)

## Admin Feature:

* Update User Role API

API:

* PUT /api/users/:id/role

---

# 👗 Phase 4 — Product Management System

## Product Model Fields:

* title
* description
* images
* category
* designer
* price
* sizes
* ratings
* review count

## APIs Built:

* POST /api/products (Admin + Designer only)
* GET /api/products (Public)
* GET /api/products/:id (Public)

---

# ❤️ Phase 5 — Wishlist System

## Features:

* Add to wishlist
* Prevent duplicate entries
* Remove from wishlist
* View wishlist with populated product data

## APIs:

* POST /api/users/wishlist/:productId
* DELETE /api/users/wishlist/:productId
* GET /api/users/wishlist

---

# ⭐ Phase 6 — Review & Moderation System

## Review Model:

* user reference
* product reference
* rating (1–5)
* comment
* status (pending / approved / rejected)

## User Features:

* Submit review
* Prevent duplicate reviews

## Admin Moderation:

* View pending reviews
* Approve reviews
* Reject reviews

## Public Features:

* View approved reviews per product

## APIs:

* POST /api/reviews
* GET /api/reviews/product/:productId
* GET /api/reviews/pending
* PUT /api/reviews/:id/approve
* PUT /api/reviews/:id/reject

---

# 🎯 Current Project Status

The backend system now includes:

✔ Authentication & Security
✔ Role-based Access Control
✔ Product Management
✔ Wishlist System
✔ Review Moderation System

This represents a fully functional backend architecture for a boutique platform.

---

# 🚀 Future Development Plans

## Backend Improvements

* Product update/delete APIs
* Image upload with Cloudinary
* Pagination & filtering
* Search functionality
* Analytics dashboard
* Notification system

## Frontend Development

* React frontend
* Admin dashboard UI
* User profile pages
* Product browsing UI

---

# 📅 Development Log Rule

From now on, every new feature added to the project must be recorded in this file with:

* Feature name
* APIs added
* Models updated
* Key implementation notes

---
## 📅 Update — Product Management Enhancements

### Features Added:
- Product Update API
- Product Delete API

### New APIs:
- PUT /api/products/:id → Update product details
- DELETE /api/products/:id → Delete product

### Implementation Notes:
- Role-based access enforced (admin + designer only)
- Partial updates supported using Object.assign()
- Safe deletion with existence validation
## 📅 Update — Product Search & Filtering System

### Features Added:
- Keyword search for products
- Category filtering
- Price range filtering
- Pagination support

### API Updated:
- GET /api/products now supports query parameters

### Example Queries:
- ?keyword=lehenga
- ?category=Bridal
- ?minPrice=10000&maxPrice=200000
- ?page=1&limit=5

### Implementation Notes:
- MongoDB regex used for search
- Dynamic query object built based on parameters
- Efficient pagination using skip and limit


## 📅 Update — Cloudinary Image Upload Integration

### 🎯 Feature Implemented:

Cloud-based image upload system for product images using Cloudinary.

---

## 📸 Key Capabilities Added:

### 1️⃣ Direct Image Upload

* Products can now accept image files during creation.
* Supports multiple image uploads (up to 5 images per product).

---

### 2️⃣ Automatic Cloud Storage

* Uploaded images are stored securely in Cloudinary.
* Images are automatically placed inside:
  **"boutique_products"** folder.

---

### 3️⃣ URL-Based Storage

* Instead of storing files locally, the backend saves Cloudinary CDN URLs in MongoDB.
* Enables fast global image delivery.

---

## 🛠️ Technologies Integrated:

### Middleware & Libraries:

* **Multer** → Handles file uploads in Express
* **Cloudinary SDK** → Cloud image hosting
* **multer-storage-cloudinary** → Direct upload integration

---

## 📂 New Files Created:

### `config/cloudinary.js`

* Configures Cloudinary credentials using environment variables.

### `middleware/uploadMiddleware.js`

* Handles file upload processing
* Automatically uploads images to Cloudinary
* Returns secure image URLs

---

## 🔄 Product API Enhancements:

### Updated Endpoint:

```
POST /api/products
```

Now supports:

* Multipart form-data requests
* Multiple image file uploads
* Automatic Cloudinary integration

---

## 📈 System Impact:

The platform now supports **production-grade media handling**:

* Scalable image storage
* CDN-based delivery
* Secure cloud asset management
* Optimized performance for product galleries

---

## 🚀 Current Backend Status:

The backend system now includes:

✔ Authentication & JWT Security
✔ Role-Based Authorization
✔ Product CRUD Operations
✔ Wishlist Management
✔ Review Moderation System
✔ Search, Filtering & Pagination
✔ Cloud Image Upload System

This represents a **fully functional, enterprise-ready backend architecture**.

---

## 🔮 Next Planned Enhancements:

Upcoming backend features include:

* Image deletion & replacement system
* Automatic product rating calculations
* Advanced filtering & sorting options
* Analytics dashboard APIs
* Frontend integration (React)

---
## 📅 Update — Product Image Lifecycle Management

### Features Added:

* Automatic deletion of old images when updating products
* Automatic removal of Cloudinary images when deleting products

### Implementation Details:

* Cloudinary public_id extracted from image URLs
* Helper utility created for image deletion
* Product update route now replaces old images safely
* Product delete route removes associated cloud images

### Impact:

Ensures efficient cloud storage usage and prevents orphaned media files.


## 📅 Update — Selective Product Image Replacement

### Feature Added:

* Ability to update only a specific product image instead of replacing all images.

### Implementation Details:

* Product update API now accepts `imageIndex` parameter.
* Only the selected image is replaced.
* Old image is automatically deleted from Cloudinary.
* Remaining images stay unchanged.

### Benefits:

* Efficient media management
* Reduced cloud storage usage
* Flexible image editing capability


## 📅 Update — Gender-Based Default Avatar Feature

### Features Added:
- Gender field introduced in user model
- Dynamic avatar generation based on gender
- Default avatars assigned automatically during registration

### Implementation:
- Integrated DiceBear Avatar API
- Male, female, and neutral avatar styles supported

### Impact:
Improves personalization and eliminates need for manual default images.

## 📅 Update — Automatic Product Rating System

### Feature Added:
- Automatic calculation of product ratings when reviews are approved.

### Implementation:
- Created rating helper utility.
- Product rating recalculates dynamically based on approved reviews.
- Average rating stored with one decimal precision.

### Impact:
Provides real-time product rating insights similar to modern e-commerce platforms.
\n## ?? Update � Routing & Configuration Cleanup\n\n### Changes Made:\n- Switched config/db.js to use process.env.MONGO_URI with local fallback.\n- Fixed duplicate dotenv.config() call in server.js.\n- Updated userRoutes wishlist GET endpoint to /wishlist (no productId).\n- Removed duplicate approve route in eviewRoutes and consolidated logic.\n- Refactored product and review route logic into controllers files.\n- Cleaned up Cloudinary config (removed console.log).\n
 
## ?? Update � Added Review Retrieval Endpoint

- Implemented public `GET /api/reviews/product/:productId` route.
- Added corresponding controller method `getReviewsForProduct`.
- Verified full workflow: user submission ? admin approval ? rating update ? public retrieval.

## ? Feature Smoke Tests Completed
- Authentication (register/login) verified.
- Role-based access tested with admin token.
- Product CRUD operations (create, read, update, delete).
- Wishlist add/get/remove.
- Review submission, moderation, approval, and rating calculation.
- Search, filtering, pagination, sorting on products.
- Cloudinary integration unaffected (fileless tests).
- Config and environment adjustments made.

