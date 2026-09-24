const Review = require("../models/Review");
const Product = require("../models/Product");
const { updateProductRating } = require("../utils/ratingHelper");

// 🔹 Submit Review (User Only)
exports.submitReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingReview = await Review.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review submitted successfully (pending approval)",
      review,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Approve Review (Admin Only)
exports.approveReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.status = "approved";
    await review.save();

    // 🔹 Update product rating automatically
    await updateProductRating(review.product);

    res.json({ message: "Review approved and rating updated" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Get All Pending Reviews (Admin Only)
exports.getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "pending" })
      .populate("user", "name email")
      .populate("product", "title");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Reject Review (Admin Only)
exports.rejectReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.status = "rejected";
    await review.save();

    res.json({ message: "Review rejected successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Get Approved Reviews for Product (Public)
exports.getReviewsForProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.find({ product: productId, status: "approved" })
      .populate("user", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
