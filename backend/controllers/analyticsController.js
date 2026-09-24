const mongoose = require("mongoose");
const Analytics = require("../models/Analytics");

// 🔹 Log Event
exports.logEvent = async (req, res) => {
  try {
    const { eventType, productId, metadata } = req.body;
    const userId = req.user ? req.user.id : null;

    const event = await Analytics.create({
      userId,
      eventType,
      productId,
      metadata,
    });

    res.status(201).json({ message: "Event logged", event });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Get Product Analytics (Admin)
exports.getProductAnalytics = async (req, res) => {
  try {
    const { productId } = req.params;

    const analytics = await Analytics.aggregate([
      { $match: { productId: mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: "$eventType",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Get User Analytics (Admin)
exports.getUserAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;

    const analytics = await Analytics.find({ userId }).sort({ timestamp: -1 }).limit(100);

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Get Overall Analytics (Admin)
exports.getOverallAnalytics = async (req, res) => {
  try {
    const totalViews = await Analytics.countDocuments({ eventType: 'view' });
    const totalClicks = await Analytics.countDocuments({ eventType: 'click' });
    const totalWishlistAdds = await Analytics.countDocuments({ eventType: 'wishlist_add' });

    // Top viewed products
    const topProducts = await Analytics.aggregate([
      { $match: { eventType: 'view' } },
      {
        $group: {
          _id: "$productId",
          views: { $sum: 1 },
        },
      },
      { $sort: { views: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      { $project: { title: '$product.title', views: 1 } },
    ]);

    res.json({
      totalViews,
      totalClicks,
      totalWishlistAdds,
      topProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};