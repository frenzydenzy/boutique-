const cloudinary = require("../config/cloudinary");

// 🔹 Extract Public ID from Cloudinary URL
const extractPublicId = (imageUrl) => {
  const parts = imageUrl.split("/");
  const fileName = parts.pop(); // abc123.jpg
  const folder = parts.pop(); // boutique_products

  const publicId = `${folder}/${fileName.split(".")[0]}`;
  return publicId;
};

// 🔹 Delete Image from Cloudinary
const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    const publicId = extractPublicId(imageUrl);
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};

module.exports = {
  deleteImageFromCloudinary,
};
