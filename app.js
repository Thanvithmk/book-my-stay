const express=require('express');
const app=express();
const mongoose=require('mongoose');

//connect to mongodb and create database
async function main(){
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
    console.log('Connected to MongoDB');
}

main();

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
const ExpressError=require('./utils/ExpressError');

//listing routes
const listingRoutes=require('./routes/listing');
app.use('/listings',listingRoutes);

//review routes
const reviewRoutes=require('./routes/review');
app.use('/listings/:id/reviews',reviewRoutes);

//routes
app.get('/',(req,res)=>{
    res.send('Hello World');
});

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

