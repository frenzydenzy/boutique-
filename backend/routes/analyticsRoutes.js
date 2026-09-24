const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  logEvent,
  getProductAnalytics,
  getUserAnalytics,
  getOverallAnalytics,
} = require("../controllers/analyticsController");

const router = express.Router();

// 🔹 Log Event (Protected - for logged users)
router.post("/log", protect, logEvent);

// 🔹 Get Product Analytics (Admin)
router.get("/product/:productId", protect, authorizeRoles("admin"), getProductAnalytics);

// 🔹 Get User Analytics (Admin)
router.get("/user/:userId", protect, authorizeRoles("admin"), getUserAnalytics);

// 🔹 Get Overall Analytics (Admin)
router.get("/overall", protect, authorizeRoles("admin"), getOverallAnalytics);

module.exports = router;