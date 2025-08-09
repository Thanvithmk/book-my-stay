const express=require("express");
const router=express.Router({mergeParams:true}); //mergeParams:true is used to access the params of the parent route listings/:id/reviews in this route

//models
const Listing=require('../models/listing');
const Review=require('../models/review');

//utils
const wrapAsync=require('../utils/warpAsync'); //to handle async errors in routes using try catch block 

//middleware
const {validateReview,isLoggedIn,isReviewAuthor}=require('../middleware');

//review route
router.post("/",isLoggedIn,validateReview,wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;   //id :thanv3.6 add the author id to the review
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash('success','Successfully added the review');
    res.redirect(`/listings/${listing._id}`);
})
);

//delete review route
router.delete("/:reviewid",isLoggedIn,isReviewAuthor,wrapAsync(async(req,res)=>{
    const {id,reviewid}=req.params;
    await Review.findByIdAndDelete(reviewid);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    req.flash('success','Successfully deleted the review');
    res.redirect(`/listings/${id}`);
})
);

module.exports=router;