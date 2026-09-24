const Review = require("../models/Review");
const Product = require("../models/Product");

// 🔹 Recalculate Product Rating
const updateProductRating = async (productId) => {
  try {
    // Get all approved reviews for this product
    const reviews = await Review.find({
      product: productId,
      status: "approved",
    });

    const totalReviews = reviews.length;

    let averageRating = 0;

    if (totalReviews > 0) {
      const totalRating = reviews.reduce((sum, review) => {
        return sum + review.rating;
      }, 0);

      averageRating = totalRating / totalReviews;
    }

    // Update product
    await Product.findByIdAndUpdate(productId, {
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews,
    });

  } catch (error) {
    console.error("Rating update error:", error);
  }
};

module.exports = { updateProductRating };
