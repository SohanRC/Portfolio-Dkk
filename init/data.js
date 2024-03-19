const mongoose = require('mongoose');
// const List = require("../models/publication.js");

main().then(() => {
  console.log("connection is sucess");
})
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');

}


const sampleListings = [
  {
    title: "X-ResFormer: A Model to Detect Infestation of Pest and Diseases on Crops",
    date: "11th December 2022",
    description: "Dhiman Mondal, Purbayan Kar, Kusal Roy, Dipak Kumar Kole, Swalpa Kumar Roy, “X-ResFormer: A Model to Detect Infestation of Pest and Diseases on Crops”, International Journal of SN Computer Science, Vol.-5, Issue 1, Page No. 86, 11th December 2022.",
    type:"Journal"
  },
  
];

module.exports = { data: sampleListings };

