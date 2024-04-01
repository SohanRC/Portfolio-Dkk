const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { TrekkingSchema } = require("../schemaValidation.js");
const router = express.Router();
const { isLoggedin } = require("../views/middleware.js");
const Trekking = require("../models/trekking.js");

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
  res.render("./Trekking/index", { data });
}));

//Show Route 

// router.get("/:id", asyncWrap(async (req, res) => {
//   console.log(req.params);
//   // let { id } = req.params;
//   // const data = await Trekking.find({ _id: id });
//   res.render("./Trekking/details");
// }));

// //update Route
// router.get("/edit",isLoggedin, asyncWrap(async (req, res) => {
//   const data = await Publication.find().sort({year:-1,priority:-1});
//   console.log(data);
//   res.render("./Publications/show", { data });
// }));

// // Create Route --> its have to be before show or new will be detected as id
// router.get("/new",isLoggedin, (req, res) => {
//   let {type}=req.query;
//   res.render("./Publications/create",{type});
// });


// router.post("/",isLoggedin, validatePublication, asyncWrap(async (req, res) => {
//   let { newpublication } = req.body;
//   console.log(newpublication);
//   const list = new Publication(newpublication);
//   await list.save()
//   res.redirect("/publications/edit");

// }));

// //Edit Route
// router.get("/:id/edit",isLoggedin,asyncWrap(async (req, res) => {
//   let { id } = req.params;
//   const data = await Publication.find({ _id: id });
//   console.log(data);
//   res.render("./Publications/edit", { data: data[0] });
// }));

// router.patch("/:id",isLoggedin,validatePublication,asyncWrap(async (req, res) => {
//   let { id } = req.params;
//   let { newpublication } = req.body;
//   await Publication.findByIdAndUpdate(id, newpublication);
//   res.redirect(`/publications/edit`);
// }));

// //Delete Route
// router.delete("/:id",isLoggedin, asyncWrap(async (req, res) => {
//   let { id } = req.params;
//   await Publication.findOneAndDelete({ _id: id });
//   res.redirect("/publications/edit");
// }));




module.exports = router;