const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required for a tour'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required for a tour'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Group size is required for a tour'],
  },
  difficulty: {
    type: String,
    required: [true],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Price is required for a tour'],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required for a tour'],
  },
  imageCover: {
    type: String,
    required: [true, 'Cover image is required for a tour'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
