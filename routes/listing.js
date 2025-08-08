const express=require("express");
const router=express.Router();

//models
const Listing=require('../models/listing');
//utils
const warpAsync=require('../utils/warpAsync'); //to handle async errors in routes using try catch block 
const ExpressError=require('../utils/ExpressError');

//schema
const {listingSchema}=require('../schema');

//joi validation
//listing validation
const validateListing=(req,res,next)=>{
    const {error}=listingSchema.validate(req.body);
    if(error){
        let errormsg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(errormsg,400);
    }else{
        next();
    }
}

//index route
router.get('/',warpAsync(async(req,res)=>{
    const allListings=await Listing.find({})
    res.render('listings/index.ejs',{allListings})
}))

//new route
router.get('/new',(req,res)=>{
    res.render('listings/new.ejs')
})

//create route
router.post('/',validateListing,warpAsync(async(req,res)=>{
    let newlisting=req.body.listing;
    await new Listing(newlisting).save();
    res.redirect('/listings');
}))

//edit route
router.get("/:id/edit",warpAsync(async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render('listings/edit.ejs',{listing})
}))

//update route
router.put("/:id",validateListing,warpAsync(async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findByIdAndUpdate(id,req.body.listing,{new:true});
    res.redirect(`/listings/${listing._id}`);
})
);

//show route
router.get('/:id',warpAsync(async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id).populate('reviews');
    res.render('listings/show.ejs',{listing})
})
);

//delete route
router.delete("/:id",warpAsync(async(req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
})
);

module.exports=router;