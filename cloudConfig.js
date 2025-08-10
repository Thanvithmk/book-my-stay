const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary');


//TO CONNECT CLOUDINARY TO OUR APP code_id: thanv4.1
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'wanderlust_DEV',
        allowedFormats:['png','jpg','jpeg'],
       // public_id:(req,file)=>file.originalname.split('.')[0],
    }
})

module.exports={
    cloudinary,
    storage
}