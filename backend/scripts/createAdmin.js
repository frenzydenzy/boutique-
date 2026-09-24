const mongoose = require('mongoose');
const User = require('../models/user');

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/boutique');
    await User.deleteMany({ email: 'admin@boutique.test' });
    await User.create({
      name: 'Admin',
      email: 'admin@boutique.test',
      password: '$2b$10$6ztQ5.dyQy4RI4L21/Hmyujx2gHeMYPkPbSoVbKZykJkpZXSz2dLC',
      gender: 'other',
      role: 'admin',
    });
    console.log('admin user inserted');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();