const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const router = express.Router();
const {isLoggedin}=require("../views/middleware.js");


//Read Route
router.get("/",isLoggedin, asyncWrap(async (req, res) => {
    res.render("./Dashboard/index.ejs");
}));




module.exports = router;