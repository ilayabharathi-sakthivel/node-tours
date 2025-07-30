const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/config.env` });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('DB connection successful!!!');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required for a tour'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Price is required for a tour'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const port = process.env.PORT;
app.listen(port, () => {});
