const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { AwardSchema } = require("../schemaValidation.js");
const router = express.Router();
const { isLoggedin } = require("../views/middleware.js");
const Award = require("../models/awards.js");
const User = require("../models/user.js")
//Listing Schema Validation
const validateAward = (req, res, next) => {
  let { error } = AwardSchema.validate(req.body);
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
  const data = await Award.find().sort({ date: -1 });
  const user = await User.find({});
  console.log(data);
  res.render("./Awards/index.ejs", {
    data,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
  });
}));

//Edit Route
router.get("/edit", isLoggedin,asyncWrap(async (req, res) => {
  const data = await Award.find().sort({ date: -1 });
  console.log(data);
  const user = await User.find({});
  res.render("./Awards/show.ejs", { data,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin, });
}));

// Create Route --> its have to be before show or new will be detected as id
router.get("/new",isLoggedin, async(req, res) => {
  const user = await User.find({});
  res.render("./Awards/create",{
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,});
});


router.post("/", isLoggedin,validateAward, asyncWrap(async (req, res) => {
  let { newaward } = req.body;
  console.log(newaward);
  const list = new Award(newaward);
  await list.save();
  res.redirect("/awards/edit");

}));

//Edit Route
router.get("/:id/edit",isLoggedin, asyncWrap(async (req, res) => {
  let { id } = req.params;
  const data = await Award.find({ _id: id });
  console.log(data);
  const user = await User.find({});
  res.render("./Awards/edit", { data: data[0],
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin, });
}));

router.patch("/:id",isLoggedin, validateAward, asyncWrap(async (req, res) => {
  let { id } = req.params;
  let { newaward } = req.body;
  await Award.findByIdAndUpdate(id, newaward);
  res.redirect(`/awards/edit`);
}));

//Delete Route
router.delete("/:id",isLoggedin, asyncWrap(async (req, res) => {
  let { id } = req.params;
  await Award.findOneAndDelete({ _id: id });
  res.redirect("/awards/edit");
}));




module.exports = router;