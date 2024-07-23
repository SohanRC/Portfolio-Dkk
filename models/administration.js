const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const Review = require("./reviews.js");

const userSchema = new mongoose.Schema({

  year: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  priority: {
    type: Number,
    required: true,
    default: 1,
  },
});

const Administration = mongoose.model("Administration", userSchema);

module.exports = Administration;