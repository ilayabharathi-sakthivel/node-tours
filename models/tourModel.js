const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required for a tour'],
      unique: true,
      trim: true,
      maxlength: [40, 'Max char limit reached on name field (40)'],
      minlength: [10, 'Min 10 char required on the name field'],
      validate: {
        validator: function (val) {
          return val.match(/^[A-Za-z ]+$/);
        },
        message: 'Name should only have alphabets',
      },
    },
    slug: {
      type: String,
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      max: [5.0, 'Ratings cannot exceed 5.0'],
      min: [1.0, 'Ratings should be greater than 1.0'],
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
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be lower than price',
      },
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
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE runs before save() & create() NOT insertMany()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// // post hook will have access to current inserted document
// tourSchema.post('save', function (doc, next) {
//   next();
// });

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

// post hook will have access to all selected documents
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
