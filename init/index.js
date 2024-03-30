const mongoose = require('mongoose');
const List = require("../models/user.js");
// const Review=require("../models/reviews.js");
// const initdata = require("./data.js");

main().then(()=>{
console.log("connection is sucess");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.URI);
  
}

const initDB = async ()=>{
    // await List.deleteMany({});
    // await Review.deleteMany({});
    console.log("data is Initialized");
};

initDB();