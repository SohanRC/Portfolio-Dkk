require('dotenv').config();
const mongoose = require('mongoose');
const List = require("../models/MSF.js");
// const Review=require("../models/reviews.js");
const {data} = require("./data.js");

main().then(()=>{
console.log("connection is sucess");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.URI);
}

const initDB = async ()=>{
    // await List.deleteMany({});
    await List.deleteMany({});
    // console.log(initdata);
    await List.insertMany(data);
    console.log("data is Initialized");
};

initDB();