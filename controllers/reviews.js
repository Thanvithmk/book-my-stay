const Review=require("../models/review");
const Listing=require("../models/listing");

module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;   //id :thanv3.6 add the author id to the review
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash('success','Successfully added the review');
    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview=async(req,res)=>{
    const {id,reviewid}=req.params;
    await Review.findByIdAndDelete(reviewid);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    req.flash('success','Successfully deleted the review');
    res.redirect(`/listings/${id}`);
}