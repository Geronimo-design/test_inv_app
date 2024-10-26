/** @format */

// A Mongoose schema for announcements.
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters.'],
      default: '',
    },
    inStock: {
      type: Number,
      required: true,
    },
    threshold: {
      type: Number,
      required: true,
    },
  },
  {
    collection: 'Product',
  }
);

module.exports = mongoose.model('Product', ProductSchema);
