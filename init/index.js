const mongoose=require('mongoose');
const initData=require('./data');
const Listing=require('../models/listing');

//connect to mongodb
async function main(){
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
    console.log('Connected to MongoDB');
}

main();

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6896f1923227c1fd06f2f1c1"
    }));
    await Listing.insertMany(initData.data);
    console.log('Data initialized');
}

initDB();



