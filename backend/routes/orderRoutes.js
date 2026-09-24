const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orderController");

const router = express.Router();

// 🔹 Create Order (Protected)
router.post("/", protect, createOrder);

// 🔹 Get User's Orders (Protected)
router.get("/my", protect, getUserOrders);

// 🔹 Get Single Order (Protected)
router.get("/:id", protect, getOrder);

// 🔹 Update Order Status (Admin)
router.put("/:id/status", protect, authorizeRoles("admin"), updateOrderStatus);

// 🔹 Get All Orders (Admin)
router.get("/", protect, authorizeRoles("admin"), getAllOrders);

module.exports = router;