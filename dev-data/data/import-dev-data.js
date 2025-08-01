const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require(`${__dirname}/../../models/tourModel`);

dotenv.config({ path: `./config.env` });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('DB connection successful!!!');
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// IMPORT DATA
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Import DONE');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE DATA
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Delete DONE');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == '--import') {
  importData();
}

if (process.argv[2] == '--delete') {
  deleteData();
}
