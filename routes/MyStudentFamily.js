require("dotenv").config();
const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { msfSchema } = require("../schemaValidation.js");
const router = express.Router();
const MSF = require("../models/MSF.js");
const { isLoggedin } = require("../views/middleware.js");
const mongoose = require('mongoose');
// const cloud_name = "ddkcibobs";
// const cloudinary = require("cloudinary").v2;
const User = require("../models/user.js")
// //cloudnari
// const cloudinaryConfig = cloudinary.config({
//   cloud_name: process.env.CLOUDNAME,
//   api_key: process.env.CLOUDAPIKEY,
//   api_secret: process.env.CLOUDINARYSECRET,
//   secure: true
// })

//Listing Schema Validation
const validateMSF = (req, res, next) => {
  let { error } = msfSchema.validate(req.body);
  if (error) {
    console.log(error);
    let errMsg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// router.post("/photo",isLoggedin, async (req, res) => {
//   let { user_id } = req.body;
//   const previmg = await MSF.find({ _id: user_id });
//   cloudinary.uploader.destroy(previmg[0].photo);
//   const data = await MSF.findOneAndUpdate({ _id: user_id }, { photo: req.body.public_id });
//   console.log(data);
//   // res.redirect(`/trekking/${user_id}/edit`);
// })

//Read Route
router.get("/", asyncWrap(async (req, res) => {
  const data = await MSF.aggregate([
    {
      $addFields: {
        messageLength: { $strLenCP: { $ifNull: ["$message", ""] } }
      }
    },
    {
      $sort: { priority: -1, messageLength: -1 }
    },
    {
      $project: { messageLength: 0 }
    }
  ]);
  console.log("HOLA  : ",data);
  const user = await User.find({});
  const updatedData = data.map(u => ({
    ...u, // Spread the existing properties of the document
    photo: u.photo ? u.photo.split('=')[1] : null // Extract the ID after '=' if photo exists
  }));
  console.log("updateData : ", updatedData);
  res.render("./MyStudentFamily/index", {
    updatedData, facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
  });
}));

//update Route
router.get("/edit", isLoggedin, asyncWrap(async (req, res) => {
  const data = await MSF.aggregate([
    {
      $addFields: {
        messageLength: { $strLenCP: { $ifNull: ["$message", ""] } }
      }
    },
    {
      $sort: { priority: -1, messageLength: -1 }
    },
    {
      $project: { messageLength: 0 }
    }
  ]);
  console.log("HOLA  : ",data);
  const updatedData = data.map(u => ({
    ...u, // Spread the existing properties of the document
    photo: u.photo ? u.photo.split('=')[1] : null // Extract the ID after '=' if photo exists
  }));
  const user = await User.find({});
  res.render("./MyStudentFamily/show", {
    data, updatedData, facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
  });
}));


//Show Route 

router.get("/:id/show", isLoggedin, asyncWrap(async (req, res) => {
  console.log(req.params);
  let { id } = req.params;
  const data = await MSF.find({ _id: id });
  const user = await User.find({});
  const updatedData = data.map(u => ({
    ...u._doc, // Spread the existing properties of the document
    photo: u.photo.split('=')[1] // Extract the ID after '='
  }));
  res.render("./MyStudentFamily/details.ejs", {
    updatedData: updatedData[0], facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
  });
}));


// // Create Route --> its have to be before show or new will be detected as id
// router.get("/new",isLoggedin, async(req, res) => {
//   const user = await User.find({});
//   res.render("./MyStudentFamily/create",{facebook: user[0].facebook,
//     twitter: user[0].twitter,
//     linkedin: user[0].linkedin,});
// });


// router.post("/",isLoggedin, validateMSF, asyncWrap(async (req, res) => {
//   let { newMSF } = req.body;
//   console.log(newMSF);
//   const list = new MSF(newMSF);
//   await list.save()
//   res.redirect("/myStudentFamily/edit");
// }));
router.patch("/:id/toggle", isLoggedin, asyncWrap(async (req, res) => {
  const { id } = req.params;
  const { newMSF } = req.body;

  try {
    const updatedMSF = await MSF.findByIdAndUpdate(id, newMSF);

    if (!updatedMSF) {
      throw new Error('MSF document not found');
    }

    res.status(200).send(updatedMSF); // Optionally send updated data back to client
  } catch (error) {
    console.error('Error updating MSF:', error);
    res.status(500).send('Error updating MSF');
  }
}));

// Edit Route
router.get("/:id/edit", isLoggedin, asyncWrap(async (req, res) => {
  let { id } = req.params;
  const data = await MSF.find({ _id: id });
  const user = await User.find({});
  res.render("./MyStudentFamily/edit", {
    data: data[0], facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
  });
}));

router.patch("/:id", isLoggedin, asyncWrap(async (req, res) => {
  let { id } = req.params;
  let { newMSF } = req.body;
  console.log("in body :", newMSF);
  await MSF.findOneAndUpdate({ _id: id }, newMSF);
  res.redirect(`/myStudentFamily/edit`);
}));

//Delete Route
router.delete("/:id", isLoggedin, asyncWrap(async (req, res) => {
  let { id } = req.params;
  const data = await MSF.find({ _id: id });
  // cloudinary.uploader.destroy(data[0].photo);
  await MSF.findOneAndDelete({ _id: id });
  res.redirect("/myStudentFamily/edit");
}));


module.exports = router;