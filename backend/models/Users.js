import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25
    }
});

const User = mongoose.model("User", userSchema);

export default User;