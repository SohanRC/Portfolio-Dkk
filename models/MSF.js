const { number } = require('joi');
const mongoose = require('mongoose');

const msfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    contact: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    meet: {
        type: String
    },
    degree: {
        type: String
    },
    dept: {
        type: String,
        required: true
    },
    org: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    message: {
        type: String,
    },
    priority:{
        type:Number,
        default:1
    },
    view:{
        type:Boolean,
        default:false

    },
});

const MSF = mongoose.model("MSF", msfSchema);

module.exports = MSF;
