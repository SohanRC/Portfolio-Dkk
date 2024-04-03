require("dotenv").config();
const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
// const { HomeSchema } = require("../schemaValidation.js");
const router = express.Router();
const Home = require("../models/Home.js");
const User = require("../models/user.js");
const {isLoggedin}=require("../views/middleware.js");
const cloudinary = require("cloudinary").v2;
const cloud_name = "dra540ujl";
//cloudnari
const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true
})

router.post("/home/image", async (req, res) => {
  const user=await User.find();
  const imgid=user[0].dp;
  cloudinary.uploader.destroy(imgid);
  await User.updateMany({},{dp:req.body.public_id});

  // const data = await Trekking.findOneAndUpdate({ _id: user_id }, { $push: { image: req.body.public_id } });
  // console.log(data);
  // // res.redirect(`/trekking/${user_id}/edit`);
})


router.get("/", async (req, res) => {

  const homeData = await Home.find().sort({priority:-1});
  const user=await User.find();

  res.render("./Home/index.ejs", {
    data: homeData,
    dp:user[0].dp,
    cloud_name
  });

});

// Edit Home Route From Dashboard
router.get("/edit", async (req, res) => {
  const homeData = await Home.find().sort({priority:-1});
  const user=await User.find();

  res.render("./Home/show.ejs", {
    data: homeData,
    dp:user[0].dp,
    cloud_name
  });

});

// create page route
router.get("/EditHome/add/:place", (req, res) => {
  res.render("./Home/create.ejs", {
    data: req.params.place,
  });
})

// edit page route
router.get("/EditHome/edit/:id", async (req, res) => {
  try {
    const p = await Home.findById(req.params.id);
    res.render("./Home/edit.ejs", {
      data: p,
    });
  } catch (error) {
    console.log("Server Error");
    res.redirect("/");
  }
})


// create a data
router.post("/create", async (req, res) => {
  try {
    const p = new Home({
      type: req.body.type,
      description: req.body.desc,
      priority:req.body.priority
    })
    const response = await p.save();
    console.log("Data Added Succesfully !");
    res.redirect("/edit");
  } catch (error) {
    console.log("Error");
    console.log(error.message);
    res.redirect("/edit");
  }
})

// update that data with id
router.patch("/update/:id", async (req, res) => {
  try {
    const updatedValue = await Home.findByIdAndUpdate(req.params.id, {
      type: req.body.type,
      description: req.body.desc,
      priority:req.body.priority
    })
    console.log("Updated Successfully !");
    res.redirect("/edit");
  } catch (error) {
    console.log("Failed to Update!");
    console.log(error.message);
    res.redirect("/edit");
  }
})


// delete with id
router.get("/EditHome/delete/:id",isLoggedin, async (req, res) => {
  try {
    await Home.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.log("Could Not Delete !");
    console.log(error.message);
    res.redirect("/");
  }
})





module.exports = router;