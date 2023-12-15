import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // Reject this file
        cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false);
    }
};

export const uploadImage = multer({ 
    storage,
    fileFilter, 
    limits: { fileSize: 1024 * 1024 * 5 }
}).single('image');


//This middleware is set up to handle the uploading of files (specifically JPEG and PNG images) to the server. 
//When applied to a route, it will:

//Save uploaded image files in the 'uploads/' directory.
//Rename the files to ensure they have unique names, combining a timestamp and the original file name.
//Only allow files with MIME types 'image/jpeg' or 'image/png', rejecting others.