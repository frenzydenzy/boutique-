const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// ?? Get All Products with Search, Filter & Pagination
router.get("/", getAllProducts);

// ?? Get Single Product (Public)
router.get("/:id", getSingleProduct);

// ?? Create Product (Supports Upload + URL Images)
router.post(
  "/",
  protect,
  authorizeRoles("admin", "designer"),
  upload.array("images", 5),
  createProduct
);

// ?? Update Product (Selective Image Replacement)
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "designer"),
  upload.single("image"), // Only one image at a time
  updateProduct
);

// ?? Delete Product (Also Deletes Cloudinary Images)
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "designer"),
  deleteProduct
);

module.exports = router;
