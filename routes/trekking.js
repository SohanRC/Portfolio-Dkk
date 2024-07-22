require("dotenv").config();
const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { TrekkingSchema } = require("../schemaValidation.js");
const router = express.Router();
const { isLoggedin } = require("../views/middleware.js");
const Trekking = require("../models/trekking.js");
const cloud_name = "ddkcibobs";
const cloudinary = require("cloudinary").v2;
const User = require("../models/user.js");
const Home = require("../models/Home.js");
//cloudnari
const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true
})

//Listing Schema Validation
const validateTrekking = (req, res, next) => {
  let { error } = TrekkingSchema.validate(req.body);
  if (error) {
    console.log(error);
    let errMsg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Add Caption Image
router.post("/:id/image/:imgid", isLoggedin, asyncWrap(async (req, res) => {
  let { id, imgid } = req.params;
  let { caption } = req.body;
  const data = await Trekking.find({ _id: id });
  let image = data[0].image;
  for (img of image) {
    if (img.url == imgid) {
      img.caption = caption;
      break;
    }
  }
  await Trekking.findOneAndUpdate({ _id: id }, { image: image });
  res.redirect(`/trekking/${id}/edit`);
}));

//Read Route
router.get("/", asyncWrap(async (req, res) => {
  const data = await Trekking.find().sort({ year: -1 });
  const pera = await Home.find();
  const user = await User.find({});
  console.log(data);
  res.render("./Trekking/index", {
    data,pera, cloud_name,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
    googleScholar: user[0].googleScholar,
  });
}));

//Show Route 

router.get("/:id/show", asyncWrap(async (req, res) => {
  console.log(req.params);
  let { id } = req.params;
  const data = await Trekking.find({ _id: id });
  const user = await User.find({});
  console.log(data);
  res.render("./Trekking/details.ejs", {
    data: data[0], cloud_name,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
    googleScholar: user[0].googleScholar,
  });
}));

//update Route
router.get("/edit", isLoggedin, asyncWrap(async (req, res) => {
  const data = await Trekking.find().sort({ year: -1 });
  const pera = await Home.find();
  console.log(data);
  const user = await User.find({});
  res.render("./Trekking/show", {
    data,pera, cloud_name,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin, googleScholar: user[0].googleScholar,
  });
}));

// Create Route --> its have to be before show or new will be detected as id
router.get("/new", isLoggedin, async (req, res) => {
  const user = await User.find({});
  res.render("./Trekking/create", {
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin, googleScholar: user[0].googleScholar,
  });
});


router.post("/", isLoggedin, validateTrekking, asyncWrap(async (req, res) => {
  let { newtrekking } = req.body;
  console.log(newtrekking);
  const list = new Trekking(newtrekking);
  await list.save()
  res.redirect("/trekking/edit");
}));





// Edit Route
router.get("/:id/edit", isLoggedin, asyncWrap(async (req, res) => {
  let { id } = req.params;
  const data = await Trekking.find({ _id: id });
  console.log(data);
  const user = await User.find({});
  res.render("./Trekking/edit", {
    data: data[0], cloud_name,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin, googleScholar: user[0].googleScholar,
  });
}));

router.patch("/:id", isLoggedin, asyncWrap(async (req, res) => {
  let { id } = req.params;
  let { newtrekking } = req.body;
  await Trekking.findByIdAndUpdate(id, newtrekking);
  res.redirect(`/trekking/edit`);
}));

//Delete Route
router.delete("/:id", isLoggedin, asyncWrap(async (req, res) => {
  let { id } = req.params;
  const data = await Trekking.find({ _id: id });
  for (imgs of data[0].image) {
    cloudinary.uploader.destroy(imgs);
  }
  await Trekking.findOneAndDelete({ _id: id });
  res.redirect("/trekking/edit");
}));


module.exports = router;