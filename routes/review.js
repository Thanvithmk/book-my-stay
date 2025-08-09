const express=require("express");
const router=express.Router({mergeParams:true}); //mergeParams:true is used to access the params of the parent route listings/:id/reviews in this route

//models
const Listing=require('../models/listing');
const Review=require('../models/review');

//utils
const wrapAsync=require('../utils/warpAsync'); //to handle async errors in routes using try catch block 

//middleware
const {validateReview,isLoggedIn,isReviewAuthor}=require('../middleware');

//controllers
const reviewController=require('../controllers/reviews');

//review route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview)
);

//delete review route
router.delete("/:reviewid",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;