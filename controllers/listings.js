const Listing=require("../models/listing");

module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({})
    res.render('listings/index.ejs',{allListings})
}

module.exports.renderNewForm=(req,res)=>{
    res.render('listings/new.ejs')
}

module.exports.showListing=async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({path :'reviews',populate:{path:"author"}})  //id :thanv3.7 nested populate the author of the review
    .populate('owner');
    if(!listing){
        req.flash('error','Listing not found');
        res.redirect('/listings');
    }
    console.log(listing);
    res.render('listings/show.ejs',{listing})
}

module.exports.createListing=async(req,res)=>{
    let URL=req.file.path;             //file path of the uploaded file
    let filename=req.file.filename;    //filename of the uploaded file
    let newlisting=new Listing(req.body.listing);
    newlisting.owner=req.user._id; //id :thanv3.1 add the owner id to the listing
    newlisting.image={url:URL,filename:filename};  
    await newlisting.save();
    req.flash('success','Successfully created a new listing'); //flash message
    res.redirect('/listings');
}

module.exports.renderEditForm=async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash('error','Cannot edit the listing');
        res.redirect('/listings');
    }   
    res.render('listings/edit.ejs',{listing})
}

module.exports.updateListing=async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash('success','Successfully updated the listing');
    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteListing=async(req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success','Successfully deleted the listing');
    res.redirect('/listings');
}