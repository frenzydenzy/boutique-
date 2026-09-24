const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  getAvailableSlots,
  bookSlot,
  getUserBookings,
  updateBookingStatus,
  cancelBooking,
  getAllBookings,
} = require("../controllers/slotController");

const router = express.Router();

// 🔹 Get Available Slots (Public)
router.get("/available", getAvailableSlots);

// 🔹 Book a Slot (Protected)
router.post("/", protect, bookSlot);

// 🔹 Get User's Bookings (Protected)
router.get("/my", protect, getUserBookings);

// 🔹 Cancel Booking (Protected)
router.put("/:id/cancel", protect, cancelBooking);

// 🔹 Get All Bookings (Admin)
router.get("/", protect, authorizeRoles("admin"), getAllBookings);

// 🔹 Update Booking Status (Admin)
router.put("/:id/status", protect, authorizeRoles("admin"), updateBookingStatus);

module.exports = router;