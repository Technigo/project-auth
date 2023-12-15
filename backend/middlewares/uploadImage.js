import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        //This calls the callback function cb with two arguments. The first argument is null, indicating that there is no error. The second argument is the generated filename. Calling the callback in this way tells Multer to proceed with saving the file with the given filename.
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

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
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit of 5MB
    } 
}).single('image');


//This middleware is set up to handle the uploading of files (specifically JPEG and PNG images) to the server. 
//When applied to a route, it will:

//Save uploaded image files in the 'uploads/' directory.
//Rename the files to ensure they have unique names, combining a timestamp and the original file name.
//Only allow files with MIME types 'image/jpeg' or 'image/png', rejecting others.