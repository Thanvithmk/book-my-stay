const express=require("express");
const router=express.Router({});
const User=require("../models/user"); //model for user
const wrapAsync=require('../utils/warpAsync'); //to handle async errors in routes using try catch block 

router.get("/signup",(req,res)=>{
    res.render("users/signup"); //render the signup form
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({username,email});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
    }catch(e){
        req.flash("error",e.message);
        console.log(e);
        res.redirect("/signup");
    }
})
);

module.exports=router;