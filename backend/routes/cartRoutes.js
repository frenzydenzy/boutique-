const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

// All routes require authentication
router.use(protect);

// 🔹 Get User's Cart
router.get("/", getCart);

// 🔹 Add Item to Cart
router.post("/", addToCart);

// 🔹 Update Cart Item Quantity
router.put("/", updateCartItem);

// 🔹 Remove Item from Cart
router.delete("/:productId", removeFromCart);

// 🔹 Clear Cart
router.delete("/", clearCart);

module.exports = router;