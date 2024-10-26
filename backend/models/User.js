/** @format */

// A Mongoose schema for announcements.
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
  },
  { collection: 'User' }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
