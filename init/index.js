const mongoose = require('mongoose');
const List = require("../models/publication.js");
// const Review=require("../models/reviews.js");
const initdata = require("./data.js");

main().then(()=>{
console.log("connection is sucess");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');
  
}

const initDB = async ()=>{
    await List.deleteMany({});
    // await Review.deleteMany({});
    await List.insertMany(initdata.data);
    console.log("data is Initialized");
};

initDB();