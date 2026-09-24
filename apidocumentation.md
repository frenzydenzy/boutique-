Perfect 👍 — now we’re moving into **professional-grade backend maturity**.

Below is your complete **API_DOCUMENTATION.md** for the Boutique Backend.

You can copy this into:

```
API_DOCUMENTATION.md
```

in your backend root.

---

# API_DOCUMENTATION.md

Boutique Exhibition Platform Backend API
Version: 1.0
Base URL: `http://localhost:5000/api`

---

# 1. Authentication APIs

---

## 1.1 Register User

### Endpoint

```
POST /users/register
```

### Body (JSON)

```json
{
  "name": "John",
  "email": "john@test.com",
  "password": "123456",
  "gender": "male"
}
```

### Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "USER_ID",
    "name": "John",
    "email": "john@test.com",
    "gender": "male",
    "profileImage": "AUTO_GENERATED_URL"
  }
}
```

---

## 1.2 Login

### Endpoint

```
POST /users/login
```

### Body

```json
{
  "email": "john@test.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "John",
    "email": "john@test.com"
  }
}
```

---

# 2. User APIs

---

## 2.1 Get Profile (Protected)

```
GET /users/profile
```

Authorization:

```
Bearer TOKEN
```

---

## 2.2 Upload / Update Profile Image

```
PUT /users/profile-image
```

Authorization:

```
Bearer TOKEN
```

Body → form-data:

* image (file)

---

## 2.3 Update User Role (Admin Only)

```
PUT /users/:id/role
```

Authorization:

```
Bearer ADMIN_TOKEN
```

Body:

```json
{
  "role": "designer"
}
```

---

# 3. Product APIs

---

## 3.1 Create Product (Admin / Designer)

```
POST /products
```

Authorization:

```
Bearer TOKEN
```

Body → form-data:

Fields:

* title
* description
* category
* designer
* price
* sizes
* images (files)
  OR
* imageUrls (manual URLs)

---

## 3.2 Get All Products

```
GET /products
```

Supports:

| Query    | Description        |
| -------- | ------------------ |
| keyword  | Search by title    |
| category | Filter by category |
| minPrice | Minimum price      |
| maxPrice | Maximum price      |
| page     | Pagination page    |
| limit    | Pagination limit   |
| sort     | Sorting            |

---

### Sorting Options

```
?sort=price_asc
?sort=price_desc
?sort=rating_desc
?sort=reviews_desc
```

---

## 3.3 Get Single Product

```
GET /products/:id
```

---

## 3.4 Update Product

```
PUT /products/:id
```

Authorization:

```
Bearer TOKEN
```

Supports:

* Field updates
* Selective image replacement (imageIndex + image)

---

## 3.5 Delete Product

```
DELETE /products/:id
```

Authorization:

```
Bearer TOKEN
```

Deletes:

* Product
* Associated Cloudinary images

---

# 4. Wishlist APIs

---

## 4.1 Add to Wishlist

```
POST /users/wishlist/:productId
```

Authorization:

```
Bearer TOKEN
```

---

## 4.2 Remove from Wishlist

```
DELETE /users/wishlist/:productId
```

Authorization:

```
Bearer TOKEN
```

---

## 4.3 Get Wishlist

```
GET /users/wishlist
```

Authorization:

```
Bearer TOKEN
```

---

# 5. Review APIs

---

## 5.1 Submit Review

```
POST /reviews
```

---

## 5.2 Get Approved Reviews for Product

```
GET /reviews/product/:productId
```

Returns a list of approved reviews for the specified product.

---

Authorization:

```
Bearer TOKEN
```

Body:

```json
{
  "productId": "PRODUCT_ID",
  "rating": 5,
  "comment": "Amazing design!"
}
```

---

## 5.2 Get Approved Reviews for Product

```
GET /reviews/product/:productId
```

---

## 5.3 Get Pending Reviews (Admin)

```
GET /reviews/pending
```

Authorization:

```
Bearer ADMIN_TOKEN
```

---

## 5.4 Approve Review (Admin)

```
PUT /reviews/:id/approve
```

Authorization:

```
Bearer ADMIN_TOKEN
```

---

## 5.5 Reject Review (Admin)

```
PUT /reviews/:id/reject
```

Authorization:

```
Bearer ADMIN_TOKEN
```

---

# 6. System Behavior Notes

---

## Authentication

All protected routes require:

```
Authorization: Bearer TOKEN
```

---

## Image Storage

* Product images stored in Cloudinary
* Profile images stored in Cloudinary
* Default avatars generated via DiceBear API

---

## Rating System

When review is approved:

* Product averageRating recalculates
* Product totalReviews updates automatically

---

# 7. Error Response Format

Standard error:

```json
{
  "message": "Error description"
}
```

Common Errors:

* 400 Bad Request
* 401 Unauthorized
* 403 Access Denied
* 404 Not Found
* 500 Server Error

---

# 8. Future API Modules (Planned)

* Analytics Dashboard APIs
* Cart & Order APIs
* Booking APIs
* Discount APIs
* Interaction Tracking APIs
* Chatbot APIs
* AR APIs

---

# API STATUS SUMMARY

✔ Fully functional authentication
✔ Role-based access control
✔ Product discovery system
✔ Cloud image lifecycle
✔ Wishlist system
✔ Review moderation
✔ Auto rating calculation

This API is production-ready for frontend integration.

---

If you’d like, I can now:

* Generate a Swagger (OpenAPI 3.0) specification
* Create a Postman Collection JSON export
* Or build the Admin Analytics API next
