require("dotenv").config();
const express = require("express");
const engine = require('ejs-mate');
const asyncWrap = require("./utils/asyncWrap.js");
const ExpressError = require("./utils/ExpressError.js");
const publications = require("./routes/publications.js");
const editors = require("./routes/editor.js");
const activities = require("./routes/activities.js");
const dashboard = require("./routes/dashboard.js");
const trekking = require("./routes/trekking.js");
const student = require("./routes/student.js");
const news = require("./routes/news.js");
const awards = require("./routes/awards.js");
const home = require("./routes/home.js");
const myStudentFamily = require("./routes/MyStudentFamily.js")
const administration = require("./routes/administration.js")
// const fileUpload = require('express-fileupload');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const user = require("./routes/user.js");
const User = require('./models/user.js');
const Trekking = require("./models/trekking.js");
const cloudinary = require("cloudinary").v2
// const fse = require("fs-extra")

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
// app.use(fileUpload());
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

//cloudnari
const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true
})

//Session Store 
const store=MongoStore.create({
  mongoUrl:process.env.URI,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600 // time period in seconds
});
store.on("error",()=>{
  console.log("Error in Mongo Session Store",err)
});
//Session Options
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,// 7 Days from now
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//save flash at res.locals
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.user;
  next();
});



app.get("/get-signature", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp
    },
    cloudinaryConfig.api_secret
  )
  res.json({ timestamp, signature })
})



app.post("/image", async (req, res) => {
  let { user_id } = req.body;

  const data = await Trekking.findOneAndUpdate({ _id: user_id }, { $push: { image:{ url:req.body.public_id }} });
  console.log(data);
  // res.redirect(`/trekking/${user_id}/edit`);
})

//Delete Image
app.delete("/trekking/:id/image/:imgid", asyncWrap(async (req, res) => {
  let { id,imgid } = req.params;
  const data = await Trekking.findOneAndUpdate({ _id: id }, { $pull: { image:{url: imgid }} });
  console.log(data);
  cloudinary.uploader.destroy(imgid);
  res.redirect(`/trekking/${id}/edit`);
}));

// ROUTERRS
app.use("/administration", administration);
app.use("/myStudentFamily", myStudentFamily);
app.use("/publications", publications);
app.use("/editors", editors);
app.use("/activities", activities);
app.use("/awards", awards);
app.use("/dashboard", dashboard);
app.use("/trekking", trekking);
app.use("/student", student);
app.use("/news", news);
app.use("/user", user);
app.use("/", home);


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

