/** @format */

// A Mongoose schema for announcements.
const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'Announcement' }
);

module.exports = mongoose.model('Announcement', AnnouncementSchema);
