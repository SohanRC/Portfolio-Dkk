require("dotenv").config();
const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { StudentSchema } = require("../schemaValidation.js");
const router = express.Router();
const Student = require("../models/student.js");
const cloud_name = "ddkcibobs";
const cloudinary = require("cloudinary").v2;
//cloudnari
const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true
})

//Listing Schema Validation
const validateStudent = (req, res, next) => {
  let { error } = StudentSchema.validate(req.body);
  if (error) {
    console.log(error);
    let errMsg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

router.post("/image", async (req, res) => {
  let { user_id } = req.body;
  const previmg = await Student.find({ _id: user_id });
  cloudinary.uploader.destroy(previmg[0].image);
  const data = await Student.findOneAndUpdate({ _id: user_id }, { image: req.body.public_id });
  console.log(data);
  // res.redirect(`/trekking/${user_id}/edit`);
})

//Read Route
router.get("/", asyncWrap(async (req, res) => {
  const data = await Student.find().sort({ priority: -1 });
  console.log(data);
  res.render("./Student/index", { data, cloud_name });
}));

//Show Route 

router.get("/:id/show", asyncWrap(async (req, res) => {
  console.log(req.params);
  let { id } = req.params;
  const data = await Student.find({ _id: id });
  console.log(data);
  res.render("./Student/details.ejs", { data: data[0], cloud_name });
}));

//update Route
router.get("/edit", asyncWrap(async (req, res) => {
  const data = await Student.find().sort({ priority: -1 });
  console.log(data);
  res.render("./Student/show", { data, cloud_name });
}));

// Create Route --> its have to be before show or new will be detected as id
router.get("/new", (req, res) => {
  res.render("./Student/create");
});


router.post("/", validateStudent, asyncWrap(async (req, res) => {
  let { newstudent } = req.body;
  console.log(newstudent);
  const list = new Student(newstudent);
  await list.save()
  res.redirect("/student/edit");
}));

// Edit Route
router.get("/:id/edit", asyncWrap(async (req, res) => {
  let { id } = req.params;
  const data = await Student.find({ _id: id });
  console.log(data);
  res.render("./Student/edit", { data: data[0], cloud_name });
}));

router.patch("/:id", asyncWrap(async (req, res) => {
  let { id } = req.params;
  let { newstudent } = req.body;
  await Student.findByIdAndUpdate(id, newstudent);
  res.redirect(`/student/edit`);
}));

//Delete Route
router.delete("/:id", asyncWrap(async (req, res) => {
  let { id } = req.params;
  const data = await Student.find({ _id: id });
  cloudinary.uploader.destroy(data[0].image);
  await Student.findOneAndDelete({ _id: id });
  res.redirect("/student/edit");
}));


module.exports = router;