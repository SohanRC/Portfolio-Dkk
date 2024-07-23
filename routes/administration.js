require("dotenv").config();
const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
// const { HomeSchema } = require("../schemaValidation.js");
const router = express.Router();
const Home = require("../models/Home.js");
const Administration = require("../models/administration.js");
const User = require("../models/user.js");
const { isLoggedin } = require("../views/middleware.js");
const cloudinary = require("cloudinary").v2;
const cloud_name = "ddkcibobs";
//cloudnari
const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true
})



router.post("/tmc", async (req, res) => {
  try {
    const { public_id, type } = req.body;

    if (!public_id || !type) {
      console.error("public_id and type are required");
    }

    let user = await User.findOne({ username: "DKK" });
    if (!user) {
      console.error("User not found");
    }

    user.adminImage.push({ url: public_id, type });

    await user.save();
    return res.send("success");
  } catch (error) {
    console.error("An error occurred:", error);
  }
})

//Add Caption Image
router.post("/image/:imgid", isLoggedin, asyncWrap(async (req, res) => {
  let { imgid } = req.params;
  let { caption } = req.body;
  let data = await User.findOne({username:"DKK"});
  let image = data.adminImage;
  for (img of image) {
    if (img.url == imgid) {
      img.caption = caption;
      break;
    }
  }
 data.adminImage = image;
  await data.save();
  res.redirect("/administration/edit");
}));


//Delete Image
router.delete("/image/:imgid", asyncWrap(async (req, res) => {
  let { imgid } = req.params;
  const data = await User.findOneAndUpdate({username:"DKK"},{ $pull: { adminImage:{url: imgid }} });
  console.log(data);
  cloudinary.uploader.destroy(imgid);
  res.redirect("/administration/edit");
}));




router.get("/", async (req, res) => {

  const homeData = await Home.find().sort({ year:-1,priority: -1 });
  const adminData = await Administration.find().sort({year:-1,priority: -1 });
  const images=await User.findOne({username:"DKK"});
  const user = await User.find();

  res.render("./Administration/index.ejs", {
    data: homeData,
    adminData,
    images:images.adminImage,
    dp: user[0].dp,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
    cloud_name,
    googleScholar : user[0].googleScholar,
  });

});

// Edit Home Route From Dashboard
router.get("/edit",isLoggedin, async (req, res) => {
  const homeData = await Home.find().sort({year:-1,priority: -1 });
  const adminData = await Administration.find().sort({year:-1,priority: -1 });
  const images=await User.findOne({username:"DKK"});
  const user = await User.find();

  res.render("./Administration/show.ejs", {
    data: homeData,
    adminData,
    images:images.adminImage,
    dp: user[0].dp,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
    cloud_name,
    googleScholar : user[0].googleScholar,
  });

});



// create page route
router.get("/EditHome/add/:place",isLoggedin, async(req, res) => {
  const user = await User.find();
  res.render("./Administration/create.ejs", {
    data: req.params.place,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
    googleScholar : user[0].googleScholar,
  });
})

// edit page route
router.get("/EditHome/edit/:id",isLoggedin, async (req, res) => {
  try {
    const p = await Administration.findById(req.params.id);
    const user = await User.find();
    res.render("./Administration/edit.ejs", {
      data: p,
      facebook: user[0].facebook,
      twitter: user[0].twitter,
      linkedin: user[0].linkedin,
      googleScholar : user[0].googleScholar,
    });
  } catch (error) {
    console.log("Server Error");
    res.redirect("/administration");
  }
})


// create a data
router.post("/create",isLoggedin, async (req, res) => {
  try {
    const p = new Administration({
      type: req.body.type,
      title: req.body.title,
      link:req.body.link,
      priority: req.body.priority,
      year:req.body.year
    })
    const response = await p.save();
    console.log("Data Added Succesfully !");
    res.redirect("/administration/edit");
  } catch (error) {
    console.log("Error");
    console.log(error.message);
    res.redirect("/administration/edit");
  }
})

// update that data with id
router.patch("/update/:id",isLoggedin, async (req, res) => {
  try {
    const updatedValue = await Administration.findByIdAndUpdate(req.params.id, {
      type: req.body.type,
      title: req.body.title,
      link:req.body.link,
      priority: req.body.priority,
      year:req.body.year
    })
    console.log("Updated Successfully !");
    const user = await User.find();
    res.redirect("/administration/edit");
  } catch (error) {
    console.log("Failed to Update!");
    console.log(error.message);
    res.redirect("/administration/edit");
  }
})


// delete with id
router.get("/EditHome/delete/:id", isLoggedin, async (req, res) => {
  try {
    await Administration.findByIdAndDelete(req.params.id);
    res.redirect("/administration");
  } catch (error) {
    console.log("Could Not Delete !");
    console.log(error.message);
    res.redirect("/administration/");
  }
})





module.exports = router;