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

//routes
app.get('/',(req,res)=>{
    res.send('Hello World');
});

//index route
app.get('/listings',async(req,res)=>{
    const allListings=await Listing.find({})
    res.render('listings/index.ejs',{allListings})
})

//show route
app.get('/listings/:id',async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render('listings/show.ejs',{listing})
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});

