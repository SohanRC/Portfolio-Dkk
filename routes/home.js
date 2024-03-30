const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
// const { HomeSchema } = require("../schemaValidation.js");
const router = express.Router();
const Home = require("../models/Home.js");
const {isLoggedin}=require("../views/middleware.js");

router.get("/", async (req, res) => {

  const homeData = await Home.find();
  res.render("./Home/index.ejs", {
    data: homeData
  });

});

// Edit Home Route From Dashboard
router.get("/edit",isLoggedin, async (req, res) => {
  const homeData = await Home.find();
  res.render("./Home/show.ejs", {
    data: homeData
  });

});

// create page route
router.get("/EditHome/add/:place",isLoggedin, (req, res) => {
  res.render("./Home/create.ejs", {
    data: req.params.place,
  });
})

// edit page route
router.get("/EditHome/edit/:id",isLoggedin, async (req, res) => {
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
router.post("/create",isLoggedin, async (req, res) => {
  try {
    const p = new Home({
      type: req.body.type,
      description: req.body.desc,
    })
    const response = await p.save();
    console.log("Data Added Succesfully !");
    res.redirect("/");
  } catch (error) {
    console.log("Error");
    console.log(error.message);
    res.redirect("/");
  }
})

// update that data with id
router.patch("/update/:id",isLoggedin, async (req, res) => {
  try {
    const updatedValue = await Home.findByIdAndUpdate(req.params.id, {
      type: req.body.type,
      description: req.body.desc,
    })
    console.log("Updated Successfully !");
    res.redirect("/");
  } catch (error) {
    console.log("Failed to Update!");
    console.log(error.message);
    res.redirect("/");
  }
})


// Image Upload
router.post("/EditHome/Image/:id",isLoggedin, async (req, res) => {
  try {
    let imageFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.redirect("/");
    }

    imageFile = req.files.coverImage;
    uploadPath = __dirname + "/public/Images/" + imageFile.name;

    imageFile.mv(uploadPath, async (err) => {
      if (err) {
        console.log("Could Not Upload Photo");
        return res.redirect("/");
      }

      const p = await Home.findByIdAndUpdate(req.params.id, {
        description: `./${imageFile.name}`
      }, {
        returnDocument: 'after',
      })

      console.log("Image Uploded Succesfully !");
      return res.redirect("/");
    })
  } catch (error) {
    console.log("Could Not Upload Photot");
    console.log(error.message);
    return res.redirect("/");
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