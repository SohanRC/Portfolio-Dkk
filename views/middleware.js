module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","Have to be login before change listing");
        return res.redirect("/user/login");
    }
    next();
    }
    
