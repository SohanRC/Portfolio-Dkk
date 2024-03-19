const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
// const {PublicationSchema}=require("../schemaValidation.js");
const router = express.Router();

// const Publication = require("../models/publication.js");

//Listing Schema Validation
// const validatePublication=(req,res,next)=>{
//   let {error}=PublicationSchema.validate(req.body);
//   if(error){
//     console.log(error);
//     let errMsg=error.details.map((el)=>el.message).join(',');
//    throw new ExpressError(400,errMsg);
//   }else{
//     next();
//   }
// };


//Read Route
router.get("/", asyncWrap(async (req, res) => {
    //   const data = await Publication.find();
    //   console.log(data);
    //   res.render("./Publications/index", { data });
    res.render("./Dashboard/index.ejs");
}));

// // Create Route --> its have to be before show or new will be detected as id
// router.get("/new",(req, res) => {
//   res.render("./Publications/create");
// });


// router.post("/",validatePublication, asyncWrap(async (req, res) => {
//   let { newpublication} = req.body;
//   console.log(newpublication);
//   const list = new Publication(newpublication);
//   await list.save()
//   res.redirect("/publications");

// }));

// //Edit Route
// router.get("/:id/edit",asyncWrap(async (req, res) => {
//   let { id } = req.params;
//   const data = await Publication.find({ _id: id });
//   console.log(data);
//   res.render("./publications/edit", { data: data[0] });
// }));

// router.patch("/:id",validatePublication,asyncWrap(async (req, res) => {
//   let { id } = req.params;
//   let { newpublication } = req.body;
//   await Publication.findByIdAndUpdate(id, newpublication);
//   res.redirect(`/publications`);
// }));



module.exports = router;