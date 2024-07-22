const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { PublicationSchema } = require("../schemaValidation.js");
const router = express.Router();
const { isLoggedin } = require("../views/middleware.js");
const Publication = require("../models/publication.js");
const Editor = require("../models/editor.js");
const User = require("../models/user.js")

//Listing Schema Validation
const validatePublication = (req, res, next) => {
  let { error } = PublicationSchema.validate(req.body);
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
  let data = await Publication.find().sort({ year: -1, priority: -1 });
  const editor = await Editor.find().sort({ year: -1,priority: -1 });
  data=[...data,...editor];
  const user = await User.find({});
  console.log(data);
  res.render("./Publications/index", {
    data,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
  });
}));

//update Route
router.get("/edit",isLoggedin, asyncWrap(async (req, res) => {
  let data = await Publication.find().sort({ year: -1, priority: -1 });
  const editor = await Editor.find().sort({ year: -1,priority: -1 });
  data=[...data,...editor];
  console.log(data);
  const user = await User.find({});
  res.render("./Publications/show", { data ,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,});
}));

// Create Route --> its have to be before show or new will be detected as id
router.get("/new",isLoggedin, async(req, res) => {
  let { type } = req.query;
  const user = await User.find({});
  res.render("./Publications/create", { type,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin, });
});


router.post("/",isLoggedin, validatePublication, asyncWrap(async (req, res) => {
  let { newpublication } = req.body;
  console.log(newpublication);
  const list = new Publication(newpublication);
  await list.save()
  res.redirect("/publications/edit");

}));

//Edit Route
router.get("/:id/edit",isLoggedin, asyncWrap(async (req, res) => {
  let { id } = req.params;
  const data = await Publication.find({ _id: id });
  console.log(data);
  const user = await User.find({});
  res.render("./Publications/edit", { data: data[0],
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin, });
}));

router.patch("/:id",isLoggedin, validatePublication, asyncWrap(async (req, res) => {
  let { id } = req.params;
  let { newpublication } = req.body;
  await Publication.findByIdAndUpdate(id, newpublication);
  res.redirect(`/publications/edit`);
}));

//Delete Route
router.delete("/:id",isLoggedin, asyncWrap(async (req, res) => {
  let { id } = req.params;
  await Publication.findOneAndDelete({ _id: id });
  res.redirect("/publications/edit");
}));




module.exports = router;