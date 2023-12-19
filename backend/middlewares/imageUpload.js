import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'your_folder',
    allowedFormats: ['jpg', 'png'],
  },
});

const parser = multer({ storage });

export default parser;
