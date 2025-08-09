const express=require("express");
const router=express.Router();

//models
const Listing=require('../models/listing');
//utils
const wrapAsync=require('../utils/warpAsync'); //to handle async errors in routes using try catch block 

//middleware
const {isLoggedIn,isOwner,validateListing}=require('../middleware');

//controllers
const listingController=require('../controllers/listings');


//index route
router.get('/',wrapAsync(listingController.index))

//new route
router.get('/new',isLoggedIn,listingController.renderNewForm);

//create route
router.post('/',isLoggedIn,validateListing,wrapAsync(listingController.createListing));  

//show route
router.get('/:id',wrapAsync(listingController.showListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//update route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

module.exports=router;