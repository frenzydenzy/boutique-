const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  getAllDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  validateCoupon,
  applyCoupon,
} = require("../controllers/discountController");

const router = express.Router();

// 🔹 Get All Discounts (Admin Only)
router.get("/", protect, authorizeRoles("admin"), getAllDiscounts);

// 🔹 Create Discount (Admin Only)
router.post("/", protect, authorizeRoles("admin"), createDiscount);

// 🔹 Update Discount (Admin Only)
router.put("/:id", protect, authorizeRoles("admin"), updateDiscount);

// 🔹 Delete Discount (Admin Only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteDiscount);

// 🔹 Validate Coupon (Public)
router.post("/validate", validateCoupon);

// 🔹 Apply Coupon (Public - but should be protected in real use)
router.post("/apply", applyCoupon);

module.exports = router;