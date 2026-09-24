require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user"); // ✅ FIXED CASING

const fixAvatars = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected");

    const users = await User.find({});

    let updated = 0;

    for (const user of users) {
      if (!user.profileImage || user.profileImage.trim() === "") {
        const avatarUrl = `https://api.dicebear.com/7.x/lorelei/svg?seed=${user.email}`;

        user.profileImage = avatarUrl;
        await user.save();

        updated++;
        console.log(`✔ Updated: ${user.email}`);
      }
    }

    console.log(`🎉 Migration complete. Updated ${updated} users.`);

    await mongoose.disconnect(); // cleaner exit
    process.exit();
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
};

fixAvatars();
