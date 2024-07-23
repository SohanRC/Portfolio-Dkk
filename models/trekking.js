const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const Review = require("./reviews.js");

const userSchema = new mongoose.Schema({

  year: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: [{
    url: String,
    caption: String
  }],
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
  }
});

const Trekking = mongoose.model("Trekking", userSchema);

module.exports = Trekking;