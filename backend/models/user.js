const mongoose = require("mongoose");

// Create User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
profileImage: {
  type: String,
  default: function () {
    if (this.gender === "female") {
      return `https://api.dicebear.com/7.x/lorelei/svg?seed=${this.email}&backgroundColor=f8d7da`;
    }

    if (this.gender === "male") {
      return `https://api.dicebear.com/7.x/lorelei/svg?seed=${this.email}&backgroundColor=d1e7dd`;
    }

    return `https://api.dicebear.com/7.x/lorelei/svg?seed=${this.email}&backgroundColor=e2e3e5`;
  }
},


  gender: {
  type: String,
  enum: ["male", "female", "other"],
  default: "other"
},




    role: {
      type: String,
      enum: ["user", "admin", "designer", "super-admin"],
      default: "user",
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
  
);

// Export model
module.exports = mongoose.model("User", userSchema);
