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
    const { public_id, type,id } = req.body;

    if (!public_id || !type) {
      console.error("public_id and type are required");
    }

    let user = await Administration.findById(id);
    if (!user) {
      console.error("User not found");
    }
    if(type=='document'){
    user.documents.push({url:public_id });
    }else{
      user.images.push({url:public_id });
    }

    await user.save();
    return res.send("success");
  } catch (error) {
    console.error("An error occurred:", error);
  }
})

//Add Caption Image
router.post("/:id/image/:imgid", isLoggedin, asyncWrap(async (req, res) => {
  let { imgid,id } = req.params;
  let { caption } = req.body;
  let data = await Administration.findById(id);
  let image = data.images;
  for (img of image) {
    if (img.url == imgid) {
      img.caption = caption;
      break;
    }
  }
 data.images = image;

 let document = data.documents;
 for (img of document) {
   if (img.url == imgid) {
     img.caption = caption;
     break;
   }
 }
data.documents = document;
  await data.save();
  res.redirect(`/administration/EditHome/details/${id}`);
}));


//Delete Image
router.delete("/:id/image/:imgid", asyncWrap(async (req, res) => {
  let { imgid,id } = req.params;
  let data = await Administration.findByIdAndUpdate(id,{ $pull: { documents:{url: imgid }} });
  data = await Administration.findByIdAndUpdate(id,{ $pull: { images:{url: imgid }} });
  console.log(data);
  cloudinary.uploader.destroy(imgid);
  res.redirect(`/administration/EditHome/details/${id}`);
}));




router.get("/", async (req, res) => {

  const adminData = await Administration.find().sort({year:-1,priority: -1 });
  const user = await User.find();

  res.render("./Administration/index.ejs", {
    data:adminData,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
    cloud_name,
    googleScholar : user[0].googleScholar,
  });

});

// Edit Home Route From Dashboard
router.get("/edit",isLoggedin, async (req, res) => {
  const adminData = await Administration.find().sort({year:-1,priority: -1 });
  const user = await User.find();

  res.render("./Administration/show.ejs", {
    adminData,
    dp: user[0].dp,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
    cloud_name,
    googleScholar : user[0].googleScholar,
  });

});


// create page route
router.get("/links/:id/EditHome/add/",isLoggedin, async(req, res) => {
  const admin=await Administration.findById(req.params.id);
  const user = await User.find();
  res.render("./Administration/createlinks.ejs", {
    data: admin,
    facebook: user[0].facebook,
    twitter: user[0].twitter,
    linkedin: user[0].linkedin,
    googleScholar : user[0].googleScholar,
  });
})

// edit page route
router.get("/links/EditHome/edit/:id",isLoggedin, async (req, res) => {
  try {
    const p = await Home.findById(req.params.id);
    const user = await User.find();
    res.render("./Home/edit.ejs", {
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
router.post("/links/:id/create",isLoggedin, async (req, res) => {
  try {
    const p = await Administration.findByIdAndUpdate(req.params.id, { $push: { links: {link:req.body.link,priority:req.body.priority} } });
    console.log("Data Added Succesfully !");
    res.redirect(`/administration/EditHome/details/${req.params.id}`);
  } catch (error) {
    console.log("Error");
    console.log(error.message);
    res.redirect("/administration");
  }
})


// delete with id
router.get("/links/:id/EditHome/delete/:linkid", isLoggedin, async (req, res) => {
  try {
    const A = await Administration.findByIdAndUpdate(req.params.id, { $pull: { links: { _id: req.params.linkid } } });
    res.redirect(`/administration/EditHome/details/${req.params.id}`);
  } catch (error) {
    console.log("Could Not Delete !");
    console.log(error.message);
    res.redirect("/administration");
  }
})



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

// edit page route
router.get("/details/:id", async (req, res) => {
  try {
    const p = await Administration.findById(req.params.id);
    const user = await User.find();
    res.render("./Administration/indexDetails.ejs", {
      data: p,
      facebook: user[0].facebook,
      twitter: user[0].twitter,
      linkedin: user[0].linkedin,
      cloud_name,
      googleScholar : user[0].googleScholar,
    });
  } catch (error) {
    console.log("Server Error");
    res.redirect("/administration");
  }
})


// details page route
router.get("/EditHome/details/:id",isLoggedin, async (req, res) => {
  try {
    const p = await Administration.findById(req.params.id);
    const user = await User.find();
    console.log(p);
    res.render("./Administration/details.ejs", {
      data: p,
      cloud_name,
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
      priority: req.body.priority,
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
      priority: req.body.priority,
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