const express = require("express");
const engine = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const publications= require("./routes/publications.js");
const activities= require("./routes/activities.js");
const dashboard= require("./routes/dashboard.js");
const awards= require("./routes/awards.js");
// const reviews=require("./routes/reviews.js");
const app = express();
let port = 3000;
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
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

main().then(() => {
  console.log("connection is sucess");
})
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');
  
}
//Home Route
app.get("/", (req, res) => {

  res.render("./Home/index.ejs");

});

app.use("/publications",publications);
app.use("/activities",activities);
app.use("/awards",awards);
app.use("/dashboard",dashboard);

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

