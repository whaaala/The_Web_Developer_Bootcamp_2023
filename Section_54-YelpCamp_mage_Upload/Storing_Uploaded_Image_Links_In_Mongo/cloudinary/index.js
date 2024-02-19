const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//Set the cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:  process.env.CLOUDINARY_SECRET
});

//Create an instance of the cloudinary storage and
   // 1. Pass the cloudinary object name you created on line 5
   // 2. pass the folder name that is to be created in cloudinary storage
     // in a params object
          // this is where all the files are located in cloudinary
    // 3. Pass the format that you want to allow in the params object also 
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormat: ['jpeg', 'png', 'jpg']
    },
});

//Export the variables
module.exports = {
    cloudinary,
    storage
}