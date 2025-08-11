const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Review=require('./review');

//schema
const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        url:String,
        filename:String
    },
    price:{
        type:Number,
        required:true
    },
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'    
        }
    ],
    owner:{  //id :thanv3.3 add the owner id to the listing
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    category:{
        type:String,
        enum:['Trending','Rooms','Iconic cities','Mountains','Castles','Amazing pools','Camping','Farm stays','Arctic','Forest','Beach','Desert','Cabins','Tiny homes'],
        default:'Trending'
    }
});

//delete all reviews when a listing is deleted
listingSchema.post('findOneAndDelete',async function(listing){
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})

//model
const Listing=mongoose.model('Listing',listingSchema);
module.exports=Listing;
