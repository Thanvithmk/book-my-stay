const express=require("express");
const router=express.Router({});
const User=require("../models/user"); //model for user
const wrapAsync=require('../utils/warpAsync'); //to handle async errors in routes using try catch block 
const passport=require("passport");
const {isLoggedIn}=require("../middleware");
const {saveRedirectUrl}=require("../middleware");
const userController=require("../controllers/users");

router.get("/signup",userController.renderSignupForm);

router.post("/signup",wrapAsync(userController.signup));

router.get("/login",userController.renderLoginForm);

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login);

router.get("/logout",isLoggedIn,userController.logout);

module.exports=router;