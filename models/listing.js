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
        url:{
            type:String,
            default:'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb" : v
        }
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        city:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'    
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
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
