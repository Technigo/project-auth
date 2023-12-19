import cloudinaryFramework from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Correct the usage here
cloudinaryFramework.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinaryFramework.v2;
