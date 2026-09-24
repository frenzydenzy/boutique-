const Product = require("../models/Product");
const { deleteImageFromCloudinary } = require("../utils/cloudinaryHelper");

// 🔹 Get All Products with Search, Filter & Pagination
exports.getAllProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    let query = {};

    // 🔍 Search by title
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    // 🏷 Filter by category
    if (category) {
      query.category = category;
    }

    // 💰 Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    const { sort } = req.query;

    let sortOption = { createdAt: -1 }; // default newest first

    if (sort === "price_asc") {
      sortOption = { price: 1 };
    }

    if (sort === "price_desc") {
      sortOption = { price: -1 };
    }

    if (sort === "rating_desc") {
      sortOption = { averageRating: -1 };
    }

    if (sort === "reviews_desc") {
      sortOption = { totalReviews: -1 };
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort(sortOption);

    const total = await Product.countDocuments(query);

    res.json({
      totalProducts: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      products,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Get Single Product (Public)
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Create Product (Supports Upload + URL Images)
exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, internalCategory, designer, price, sizes, imageUrls } = req.body;

    // Only admin can set internalCategory
    let finalInternalCategory = 'basic';
    if (req.user.role === 'admin' && internalCategory) {
      finalInternalCategory = internalCategory;
    }

    let images = [];

    // If files uploaded → use Cloudinary URLs
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.path);
    }

    // If image URLs provided manually
    if (imageUrls) {
      const urls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];
      images = images.concat(urls);
    }

    const product = await Product.create({
      title,
      description,
      images,
      category,
      internalCategory: finalInternalCategory,
      designer,
      price,
      sizes,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Update Product (Selective Image Replacement)
exports.updateProduct = async (req, res) => {
  try {
    const { imageIndex } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔹 Replace only selected image
    if (req.file && imageIndex !== undefined) {
      const index = parseInt(imageIndex);

      if (index < 0 || index >= product.images.length) {
        return res.status(400).json({ message: "Invalid image index" });
      }

      // Delete old image from Cloudinary
      await deleteImageFromCloudinary(product.images[index]);

      // Replace with new image URL
      product.images[index] = req.file.path;
    }

    // Update other fields normally
    const updateData = { ...req.body };

    // Only admin can update internalCategory
    if (updateData.internalCategory && req.user.role !== 'admin') {
      delete updateData.internalCategory;
    }

    Object.assign(product, updateData);

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Delete Product (Also Deletes Cloudinary Images)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete all images from Cloudinary
    for (const imageUrl of product.images) {
      await deleteImageFromCloudinary(imageUrl);
    }

    await product.deleteOne();

    res.json({ message: "Product and images deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
