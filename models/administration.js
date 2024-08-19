const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const Review = require("./reviews.js");

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: String,
  links: [{
    link:String,
    priority:{type:Number,default:1},
  }],
  documents: [{
    url: String,
    caption: String,
  }],
  images: [{
    url: String,
    caption: String,
  }],
  priority: {
    type: Number,
    required: true,
    default: 1,
  },
});

const Administration = mongoose.model("Administration", userSchema);

module.exports = Administration;