const mongoose = require('mongoose');
const crypto = require('crypto'); // Import the crypto module

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please add an email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    accessToken: {
        type: String,
        default: () => crypto.randomBytes(128).toString('hex')
    }
},
    { timestamps: true }); // Fix the typo in timestamps

const User = mongoose.model('User', userSchema);
module.exports = User;
