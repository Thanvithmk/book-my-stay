const express=require("express");
const router=express.Router({});
const User=require("../models/user"); //model for user
const wrapAsync=require('../utils/warpAsync'); //to handle async errors in routes using try catch block 
const passport=require("passport");
const {isLoggedIn}=require("../middleware");
const {saveRedirectUrl}=require("../middleware");

router.get("/signup",(req,res)=>{
    res.render("users/signup"); //render the signup form
});

router.post("/signup",wrapAsync(async(req,res)=>{
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
})
);

router.get("/login",(req,res)=>{
    res.render("users/login");
});

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),(req,res)=>{
    req.flash("success","Welcome back");
    res.redirect(res.locals.redirectUrl || "/listings"); //code_id :thanv2.2 redirect to the url the user was trying to access
});

router.get("/logout",isLoggedIn,(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged out successfully");
        res.redirect("/listings");
    })
});

module.exports=router;