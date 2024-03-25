const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const Review = require("./reviews.js");

const userSchema = new mongoose.Schema({
 
  date: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  }
});

// userSchema.post("findOneAndDelete", async (listing) => {
//   console.log("MiddleWare is Called");
//   if (listing) {
//     console.log(listing);
//     await Review.deleteMany({ _id: { $in: listing.review } });
//   }
// });
const Awards = mongoose.model("Awards", userSchema);

module.exports = Awards;