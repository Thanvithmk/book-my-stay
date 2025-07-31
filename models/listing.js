const mongoose=require('mongoose');
const Schema=mongoose.Schema;

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
    }
});

//model
const Listing=mongoose.model('Listing',listingSchema);
module.exports=Listing;
