const express=require('express');
const app=express();
const mongoose=require('mongoose');

//connect to mongodb and create database
async function main(){
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
    console.log('Connected to MongoDB');
}

main();

//models
const Listing=require('./models/listing');

//ejs
const path=require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));

//method override
const methodOverride=require('method-override');
app.use(methodOverride('_method'));

//ejs mate
const ejsmate=require("ejs-mate");
app.engine('ejs',ejsmate);

//public folder
app.use(express.static(path.join(__dirname,'public')));

//utils
const warpAsync=require('./utils/warpAsync');
const ExpressError=require('./utils/ExpressError');

//schema
const {listingSchema}=require('./schema');

//joi validation
const validateListing=(req,res,next)=>{
    const {error}=listingSchema.validate(req.body);
    if(error){
        let errormsg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(errormsg,400);
    }else{
        next();
    }
}

//routes
app.get('/',(req,res)=>{
    res.send('Hello World');
});

//index route
app.get('/listings',warpAsync(async(req,res)=>{
    const allListings=await Listing.find({})
    res.render('listings/index.ejs',{allListings})
}))

//new route
app.get('/listings/new',(req,res)=>{
    res.render('listings/new.ejs')
})

//create route
app.post('/listings',validateListing,warpAsync(async(req,res)=>{
    let newlisting=req.body.listing;
    await new Listing(newlisting).save();
    res.redirect('/listings');
}))

//edit route
app.get("/listings/:id/edit",warpAsync(async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render('listings/edit.ejs',{listing})
}))

//update route
app.put("/listings/:id",validateListing,warpAsync(async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findByIdAndUpdate(id,req.body.listing,{new:true});
    res.redirect(`/listings/${listing._id}`);
}))

//show route
app.get('/listings/:id',warpAsync(async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render('listings/show.ejs',{listing})
}))

//delete route
app.delete("/listings/:id",warpAsync(async(req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
}))


//404 error
app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not found',404));
})

//error handling middleware
app.use((err,req,res,next)=>{
    const {statusCode=500,message='Something went wrong'}=err;
    res.status(statusCode).render('error.ejs',{message,statusCode});
    //res.status(statusCode).send(message);
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});

