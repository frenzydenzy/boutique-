const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Discount = require("../models/Discount");

// 🔹 Create Order from Cart
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, discountCode } = req.body;

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = cart.total;
    let discount = null;

    if (discountCode) {
      const discountDoc = await Discount.findOne({ code: discountCode.toUpperCase() });
      if (discountDoc && discountDoc.isActive && discountDoc.expiryDate > new Date()) {
        if (discountDoc.discountType === 'percentage') {
          discount = { code: discountCode, amount: total * (discountDoc.value / 100) };
        } else {
          discount = { code: discountCode, amount: discountDoc.value };
        }
        total -= discount.amount;
        // Apply discount
        await Discount.findByIdAndUpdate(discountDoc._id, { $inc: { usedCount: 1 } });
      }
    }

    const order = await Order.create({
      userId,
      items: cart.items,
      total,
      discount,
      address,
    });

    // Clear cart
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Get User's Orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).populate('items.productId').sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Get Single Order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user owns the order or is admin
    if (order.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Update Order Status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').populate('items.productId').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};