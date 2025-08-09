const Listing=require("./models/listing");
const Review=require("./models/review");
const ExpressError=require("./utils/ExpressError");
const {listingSchema,reviewSchema}=require("./schema");  //schema

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl; //code_id :thanv2 store the url the user is trying to access
        req.flash('error','You must be logged in to create a listing');
        return res.redirect('/login');
    }
    next();
}

//joi validation
//listing validation
module.exports.validateListing=(req,res,next)=>{
    const {error}=listingSchema.validate(req.body);
    if(error){
        let errormsg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(errormsg,400);
    }else{
        next();
    }
}

//review validation
module.exports.validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        let errormsg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(errormsg,400);
    }else{
        next();
    }
}

//code_id :thanv2.1 to prevent passport from changing originalUrl during login
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

//code_id :thanv3.4 to check if the user is the owner of the listing
module.exports.isOwner=async(req,res,next)=>{
    const {id}=req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not authorized");
        return res.redirect(`/listings/${id}`); 
    }
    next();
}

//code_id :thanv3.8 to check if the user is the author of the review
module.exports.isReviewAuthor=async(req,res,next)=>{
    const {id,reviewid}=req.params;
    let review= await Review.findById(reviewid);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not author of the review");
        return res.redirect(`/listings/${id}`); 
    }
    next();
}