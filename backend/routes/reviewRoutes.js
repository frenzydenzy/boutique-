const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  submitReview,
  approveReview,
  getPendingReviews,
  rejectReview,
  getReviewsForProduct,
} = require("../controllers/reviewController");

const router = express.Router();

// ?? Submit Review (User Only)
router.post("/", protect, submitReview);

// ?? Get Approved Reviews for Product (Public)
router.get("/product/:productId", getReviewsForProduct);

// ?? Approve Review (Admin Only)
router.put("/:id/approve", protect, authorizeRoles("admin"), approveReview);

// ?? Get All Pending Reviews (Admin Only)
router.get("/pending", protect, authorizeRoles("admin"), getPendingReviews);

// ?? Reject Review (Admin Only)
router.put("/:id/reject", protect, authorizeRoles("admin"), rejectReview);

module.exports = router;
