import mongoose from "mongoose";


const imageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    imageData: {  // Added field to store image data
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export const ImageModel = mongoose.model("Image", imageSchema);
