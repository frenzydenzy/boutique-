const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    eventType: {
      type: String,
      enum: ['view', 'click', 'wishlist_add', 'wishlist_remove', 'cart_add', 'purchase'],
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed, // For additional data like sessionId, referrer, etc.
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
analyticsSchema.index({ userId: 1, timestamp: -1 });
analyticsSchema.index({ eventType: 1, timestamp: -1 });
analyticsSchema.index({ productId: 1, eventType: 1 });

module.exports = mongoose.model("Analytics", analyticsSchema);