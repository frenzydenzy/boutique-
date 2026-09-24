const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { deleteImageFromCloudinary } = require("../utils/cloudinaryHelper");
const asyncHandler = require("express-async-handler");


// 🔹 Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// 🔹 Register User
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, gender } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    gender,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      profileImage: user.profileImage,
    },
  });
});


// 🔹 Login User
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  res.json({
    message: "Login successful",
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});


// 🔹 Get Profile
exports.getUserProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// 🔹 Get All Users (Admin Only)
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});


// 🔹 Update User Role (Admin Only)
exports.updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  // Validate role
  const validRoles = ['user', 'admin', 'designer', 'super-admin'];
  if (!validRoles.includes(role)) {
    res.status(400);
    throw new Error("Invalid role");
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const oldRole = user.role;
  user.role = role;
  await user.save();

  // Audit logging
  console.log(`Role updated: User ${user.email} role changed from ${oldRole} to ${role} by admin ${req.user.email}`);

  res.json({
    message: "User role updated successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});



// 🔹 Upload / Update Profile Image
exports.updateProfileImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.profileImage && !user.profileImage.includes("dicebear")) {
    await deleteImageFromCloudinary(user.profileImage);
  }

  user.profileImage = req.file.path;
  await user.save();

  res.json({
    message: "Profile image updated successfully",
    profileImage: user.profileImage,
  });
});

// 🔹 Add to Wishlist
exports.addToWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;

  if (user.wishlist.includes(productId)) {
    res.status(400);
    throw new Error("Product already in wishlist");
  }

  user.wishlist.push(productId);
  await user.save();

  res.json({
    message: "Product added to wishlist",
    wishlist: user.wishlist,
  });
});


// 🔹 Remove from Wishlist
exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;

  user.wishlist = user.wishlist.filter(
    (id) => id.toString() !== productId
  );

  await user.save();

  res.json({
    message: "Product removed from wishlist",
    wishlist: user.wishlist,
  });
});


// 🔹 Get Wishlist
exports.getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.json(user.wishlist);
});


