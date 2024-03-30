const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const router = express.Router({ mergeParams: true });
const passport = require('passport');
const { isLoggedin } = require("../views/middleware.js");

// const List = require("../models/listings.js");
const User = require("../models/user.js");



//Login
router.get("/login", asyncWrap(async (req, res) => {

    res.render("./User/login.ejs");
}));

router.post("/login", passport.authenticate('local', { failureRedirect: '/user/login', failureFlash: true, }), asyncWrap(async (req, res) => {

    req.flash("success", "Welcome back to your Portfolio");
    res.redirect("/dashboard");

}));

//logout
router.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "Successfully Logout");
        res.redirect("/");
    });

});


//change Password
router.get("/changePassword",isLoggedin, asyncWrap(async (req, res) => {
    res.render("./User/changePassword.ejs");
}));

router.post("/changePassword", isLoggedin, asyncWrap(async (req, res) => {
    try{
    let user=await User.findOne({ _id: req.user._id });
        user.changePassword(req.body.oldPassword, req.body.newPassword, function (err) {
            if (!err) {
                req.flash("success", "Password Changed !!");
                res.redirect('/dashboard');
            } else {
                req.flash("error", "Wrong Password !!");
                console.log(err);
                res.redirect("/user/changePassword");
            }
        });
    }catch(err){
        console.log(err);
    }

}));


module.exports = router;