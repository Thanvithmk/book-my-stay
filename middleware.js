const Listing=require("./models/listing");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl; //code_id :thanv2 store the url the user is trying to access
        req.flash('error','You must be logged in to create a listing');
        return res.redirect('/login');
    }
    next();
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