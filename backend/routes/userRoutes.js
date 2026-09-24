const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  updateUserRole,
  updateProfileImage,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/usercontroller");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile
router.get("/profile", protect, getUserProfile);
router.put("/profile-image", protect, upload.single("image"), updateProfileImage);

// Admin
router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.put("/:id/role", protect, authorizeRoles("admin"), updateUserRole);

// ❤️ Wishlist Routes
router.post("/wishlist/:productId", protect, addToWishlist);
router.delete("/wishlist/:productId", protect, removeFromWishlist);
router.get("/wishlist", protect, getWishlist);


module.exports = router;
