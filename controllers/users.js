const User=require("../models/user");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup"); //render the signup form
}

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({username,email});
        const registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(err)=>{ //id : thanv1 login the user after signup automatically
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");    
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login");
}

module.exports.login=(req,res)=>{
    req.flash("success","Welcome back");
    res.redirect(res.locals.redirectUrl || "/listings"); //code_id :thanv2.2 redirect to the url the user was trying to access
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged out successfully");
        res.redirect("/listings");
    })
}