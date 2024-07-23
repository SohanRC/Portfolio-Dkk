const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const adminImageSchema = new Schema({
    url: String,
    caption: String,
    type: String,
  }, { _id: false });

const User = new Schema({
    dp: String,
    facebook: String,
    twitter: String,
    linkedin: String,
    googleScholar: String,
    adminImage: [adminImageSchema],
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);