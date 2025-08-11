if(process.env.NODE_ENV!="production"){
    require('dotenv').config(); //code_id: thanv4.0 to use .env file
}

const express=require('express');
const app=express();
const mongoose=require('mongoose');

//authentication
const passport =require('passport');
const LocalStrategy =require('passport-local');
const User=require('./models/user');

//connect to mongodb and create database
const dbUrl=process.env.ATLASDB_URL
async function main(){
    await mongoose.connect(dbUrl);
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

const MongoStore=require('connect-mongo');  //cloud mongo db **

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600,      //touch after 24 hours to keep session alive (in seconds)
})
//error handling for session store
store.on('error',function(e){
    console.log('SESSION STORE ERROR',e);
})

//session
const session=require('express-session');
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,                //dont save session if nothing is changed
    saveUninitialized:true,     //save session if nothing is changed
    cookie:{
        expires :Date.now()+7*24*60*60*1000, //7 days in milliseconds
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}

//require flash messages
const flash = require('connect-flash');

app.use(session(sessionOptions));  //use session middleware to store session in cookie
app.use(flash()); //flash messages should be written after session and before routes

//using passport for authentication
app.use(passport.initialize());
app.use(passport.session()); //session middleware should be written after passport middleware
passport.use(new LocalStrategy(User.authenticate()));
//serialize and deserialize user to and from session 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//use flash messages
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user
    next();
});

//listing routes
const listingRoutes=require('./routes/listing');
app.use('/listings',listingRoutes);

//review routes
const reviewRoutes=require('./routes/review');
app.use('/listings/:id/reviews',reviewRoutes);

//user routes
const userRoutes=require('./routes/user');
app.use('/',userRoutes);

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

