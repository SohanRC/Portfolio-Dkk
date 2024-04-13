const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const Review = require("./reviews.js");

const userSchema = new mongoose.Schema({
 
  year: {
    type: Number,
  },
  description: {
    type: String,
  },
  location:{
    type:String,
  },
  priority:{
    type: Number,
    required:true
  },
  image:{
    type:String,
    required:true
  }
});

const News = mongoose.model("News", userSchema);

module.exports = News;