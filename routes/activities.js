const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { ActivitieSchema } = require("../schemaValidation.js");
const router = express.Router();
const { isLoggedin } = require("../views/middleware.js");

const Activitie = require("../models/activities.js");
const User = require("../models/user.js")
//Listing Schema Validation
const validateActivitie = (req, res, next) => {
  let { error } = ActivitieSchema.validate(req.body);
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
  const data = await Activitie.find().sort({ acted_as:-1,year: -1, priority: -1,});
  const user = await User.find({});
  console.log(data);
  res.render("./Activities/index", {
    data,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
  });
}));

//update Route
router.get("/edit", isLoggedin,asyncWrap(async (req, res) => {
  const data = await Activitie.find().sort({ year: -1, priority: -1 });
  const user = await User.find({});
  console.log(data);
  res.render("./Activities/show", { data ,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,});
}));

// Create Route --> its have to be before show or new will be detected as id
router.get("/new",isLoggedin, async(req, res) => {
  let { type } = req.query;
  const user = await User.find({});
  res.render("./Activities/create", { type,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin, });
});


router.post("/",isLoggedin, validateActivitie, asyncWrap(async (req, res) => {
  let { newactivitie } = req.body;
  console.log(newactivitie);
  const list = new Activitie(newactivitie);
  await list.save()
  res.redirect("/activities/edit");

}));

//Edit Route
router.get("/:id/edit",isLoggedin, asyncWrap(async (req, res) => {
  let { id } = req.params;
  const data = await Activitie.find({ _id: id });
  console.log(data);
  const user = await User.find({});
  res.render("./Activities/edit", { data: data[0] ,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,});
}));

router.patch("/:id",isLoggedin, validateActivitie, asyncWrap(async (req, res) => {
  let { id } = req.params;
  let { newactivitie } = req.body;
  await Activitie.findByIdAndUpdate(id, newactivitie);
  res.redirect(`/activities/edit`);
}));

//Delete Route
router.delete("/:id",isLoggedin, asyncWrap(async (req, res) => {
  let { id } = req.params;
  await Activitie.findOneAndDelete({ _id: id });
  res.redirect("/activities/edit");
}));




module.exports = router;