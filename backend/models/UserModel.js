import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Add any other user properties as needed
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
