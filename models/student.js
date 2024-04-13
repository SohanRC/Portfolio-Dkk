const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const Review = require("./reviews.js");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    university: {
        type: String,
        required: true
    },
    phd: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    link: {
        type: String, 
        required: true
    },
    dept:{
        type:String,
        required:true
    },
    reg:{
        type:String,
        required:true
    },
    priority:{
        type:Number,
        required:true
    }
});

const Student = mongoose.model("Student", userSchema);

module.exports = Student;