const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const Review = require("./reviews.js");

const userSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title:{
    type:String,
    required:true
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true
  },
  location:{
    type:String,
    required:true
  },
  link:{
    type:String,
  },
  year:{
    type:Number,
    required:true
  },
  priority:{
    type: Number,
    required:true
  }
});

// userSchema.post("findOneAndDelete", async (listing) => {
//   console.log("MiddleWare is Called");
//   if (listing) {
//     console.log(listing);
//     await Review.deleteMany({ _id: { $in: listing.review } });
//   }
// });
const Publication = mongoose.model("Publication", userSchema);

module.exports = Publication;