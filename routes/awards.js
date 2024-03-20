const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { AwardSchema } = require("../schemaValidation.js");
const router = express.Router();

const Award = require("../models/awards.js");

//Listing Schema Validation
const validateAward = (req, res, next) => {
    let { error } = AwardSchema.validate(req.body);
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
    const data = await Award.find();
    console.log(data);
    res.render("./Awards/index.ejs", { data });
}));

//Edit Route
router.get("/edit", asyncWrap(async (req, res) => {
    const data = await Award.find();
    console.log(data);
    res.render("./Awards/show.ejs", { data });
}));

// Create Route --> its have to be before show or new will be detected as id
router.get("/new",(req, res) => {
  res.render("./Awards/create");
});


router.post("/",validateAward, asyncWrap(async (req, res) => {
  let { newaward} = req.body;
  console.log(newaward);
  const list = new Award(newaward);
  await list.save()
  res.redirect("/awards/edit");

}));

//Edit Route
router.get("/:id/edit",asyncWrap(async (req, res) => {
  let { id } = req.params;
  const data = await Award.find({ _id: id });
  console.log(data);
  res.render("./Awards/edit", { data: data[0] });
}));

router.patch("/:id",validateAward,asyncWrap(async (req, res) => {
  let { id } = req.params;
  let { newaward } = req.body;
  await Award.findByIdAndUpdate(id, newaward);
  res.redirect(`/awards/edit`);
}));

//Delete Route
router.delete("/:id", asyncWrap(async (req, res) => {
    let { id } = req.params;
    await Award.findOneAndDelete({ _id: id });
    res.redirect("/awards/edit");
  }));
  



module.exports = router;