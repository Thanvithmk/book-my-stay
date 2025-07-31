const mongoose=require('mongoose');
const { data }=require('./data');
const Listing=require('../models/listing');

//connect to mongodb
async function main(){
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
    console.log('Connected to MongoDB');
}

main();

const initDB=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(data);
    console.log('Data initialized');
}

initDB();



