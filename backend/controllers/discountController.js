const Discount = require("../models/Discount");

// 🔹 Get All Discounts (Admin Only)
exports.getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Create Discount (Admin Only)
exports.createDiscount = async (req, res) => {
  try {
    const { code, discountType, value, expiryDate, usageLimit, applicableCategories, minPurchase } = req.body;

    const discount = await Discount.create({
      code,
      discountType,
      value,
      expiryDate,
      usageLimit,
      applicableCategories,
      minPurchase,
    });

    res.status(201).json({
      message: "Discount created successfully",
      discount,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Discount code already exists" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

// 🔹 Update Discount (Admin Only)
exports.updateDiscount = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);

    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    Object.assign(discount, req.body);
    await discount.save();

    res.json({
      message: "Discount updated successfully",
      discount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Delete Discount (Admin Only)
exports.deleteDiscount = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);

    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    await discount.deleteOne();

    res.json({ message: "Discount deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Validate Coupon (Public)
exports.validateCoupon = async (req, res) => {
  try {
    const { code, category, purchaseAmount } = req.body;

    const discount = await Discount.findOne({ code: code.toUpperCase() });

    if (!discount) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    if (!discount.isActive) {
      return res.status(400).json({ message: "Coupon is inactive" });
    }

    if (discount.expiryDate < new Date()) {
      return res.status(400).json({ message: "Coupon has expired" });
    }

    if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
      return res.status(400).json({ message: "Coupon usage limit reached" });
    }

    if (discount.applicableCategories.length > 0 && !discount.applicableCategories.includes(category)) {
      return res.status(400).json({ message: "Coupon not applicable to this category" });
    }

    if (purchaseAmount < discount.minPurchase) {
      return res.status(400).json({ message: "Minimum purchase amount not met" });
    }

    res.json({
      message: "Coupon is valid",
      discount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Apply Coupon (Increment usedCount)
exports.applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const discount = await Discount.findOne({ code: code.toUpperCase() });

    if (!discount) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    discount.usedCount += 1;
    await discount.save();

    res.json({
      message: "Coupon applied successfully",
      discount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};