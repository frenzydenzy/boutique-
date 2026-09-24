const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
      required: true,
    },

    internalCategory: {
      type: String,
      enum: ['premium', 'medium', 'basic'],
      default: 'basic',
    },

    designer: {
      type: String,   // later we will link to Designer model
      required: true,
    },

    price: {
      type: Number,
      default: 0,
    },

    sizes: [
      {
        type: String,
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    isPurchasable: {
      type: Boolean,
      default: false, // exhibition mode
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
