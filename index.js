require("dotenv").config();
const express = require("express");
const engine = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const publications = require("./routes/publications.js");
const activities = require("./routes/activities.js");
const dashboard = require("./routes/dashboard.js");
const awards = require("./routes/awards.js");
const Home = require('./models/Home.js')
const fileUpload = require('express-fileupload');

const app = express();
let port = process.env.PORT;
var methodOverride = require('method-override')
const path = require("path");
const mongoose = require('mongoose');
app.engine('ejs', engine);

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.static(path.join(__dirname, "/public/Images")));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

main().then(() => {
  console.log("connection is sucess");
})
  .catch(err => console.log(err));

// console.log(process.env);
async function main() {
  await mongoose.connect(process.env.URI);

}


// ROUTERRS
app.use("/publications", publications);
app.use("/activities", activities);
app.use("/awards", awards);
app.use("/dashboard", dashboard);


// ************************Home Routes Starts here********************
app.get("/", async (req, res) => {

  const homeData = await Home.find();
  res.render("./Home/index.ejs", {
    data: homeData
  });

});

// Edit Home Route From Dashboard
app.get("/edit", async (req, res) => {
  const homeData = await Home.find();
  res.render("./Home/show.ejs", {
    data: homeData
  });

});

// create page route
app.get("/EditHome/add/:place", (req, res) => {
  res.render("./Home/create.ejs", {
    data: req.params.place,
  });
})

// edit page route
app.get("/EditHome/edit/:id", async (req, res) => {
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
app.post("/create", async (req, res) => {
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
app.patch("/update/:id", async (req, res) => {
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
app.post("/EditHome/Image/:id", async (req, res) => {
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
        description : `./${imageFile.name}`
      }, {
        returnDocument : 'after',
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
app.get("/EditHome/delete/:id", async (req, res) => {
  try {
    await Home.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.log("Could Not Delete !");
    console.log(error.message);
    res.redirect("/");
  }
})

// ************************Home page routes ends here*******************



//Wrong Path
app.all("*", (req, res, next) => {
  next(new ExpressError(400, "Page Not Exist"));
});


//Error Handle
app.use((err, req, res, next) => {
  console.log(err);
  let { status = 500, message = "Something Went Wrong" } = err;
  res.status(status).render("error", { status, message });
});

