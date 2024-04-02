require("dotenv").config();
const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { TrekkingSchema } = require("../schemaValidation.js");
const router = express.Router();
const { isLoggedin } = require("../views/middleware.js");
const Trekking = require("../models/trekking.js");
const cloud_name = "dra540ujl";
const cloudinary = require("cloudinary").v2;
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


//Read Route
router.get("/", asyncWrap(async (req, res) => {
  const data = await Trekking.find().sort({ year: -1 });
  console.log(data);
  res.render("./Trekking/index", { data,cloud_name });
}));

//Show Route 

router.get("/:id/show", asyncWrap(async (req, res) => {
  console.log(req.params);
  let { id } = req.params;
  const data = await Trekking.find({ _id: id });
  console.log(data);
  res.render("./Trekking/details.ejs",{data:data[0],cloud_name});
}));

//update Route
router.get("/edit", asyncWrap(async (req, res) => {
  const data = await Trekking.find().sort({year:-1});
  console.log(data);
  res.render("./Trekking/show", { data,cloud_name });
}));

// Create Route --> its have to be before show or new will be detected as id
router.get("/new", (req, res) => {
  res.render("./Trekking/create");
});


router.post("/", validateTrekking, asyncWrap(async (req, res) => {
  let { newtrekking } = req.body;
  console.log(newtrekking);
  const list = new Trekking(newtrekking);
  await list.save()
  res.redirect("/trekking/edit");
}));





// Edit Route
router.get("/:id/edit",asyncWrap(async (req, res) => {
  let { id } = req.params;
  const data = await Trekking.find({ _id: id });
  console.log(data);
  res.render("./Trekking/edit", { data: data[0],cloud_name});
}));

router.patch("/:id",asyncWrap(async (req, res) => {
  let { id } = req.params;
  let { newtrekking } = req.body;
  await Trekking.findByIdAndUpdate(id, newtrekking);
  res.redirect(`/trekking/edit`);
}));

//Delete Route
router.delete("/:id", asyncWrap(async (req, res) => {
  let { id } = req.params;
  const data = await Trekking.find({ _id: id });
  for(imgs of data[0].image){
    cloudinary.uploader.destroy(imgs);
  }
  await Trekking.findOneAndDelete({ _id: id });
  res.redirect("/trekking/edit");
}));


module.exports = router;