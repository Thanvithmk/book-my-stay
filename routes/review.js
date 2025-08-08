const express=require("express");
const router=express.Router({mergeParams:true}); //mergeParams:true is used to access the params of the parent route listings/:id/reviews in this route

//models
const Listing=require('../models/listing');
const Review=require('../models/review');

//utils
const warpAsync=require('../utils/warpAsync'); //to handle async errors in routes using try catch block 

//schema
const {reviewSchema}=require('../schema');

//joi validation
//review validation
const validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        let errormsg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(errormsg,400);
    }else{
        next();
    }
}

//review route
router.post("/",validateReview,warpAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
})
);

//delete review route
router.delete("/:reviewid",warpAsync(async(req,res)=>{
    const {id,reviewid}=req.params;
    await Review.findByIdAndDelete(reviewid);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    res.redirect(`/listings/${id}`);
})
);

module.exports=router;