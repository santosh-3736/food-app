const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Category title is required'],
    },
    imageUrl: {
      type: String,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR40FaZ43J6_vuQAoWxX5mFnURuYZRfqspOFg&s',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('category', CategorySchema);
