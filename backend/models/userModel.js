// Import necessary libraries and modules
const mongoose = require('mongoose'); // Import the mongoose library for MongoDB
const crypto = require('crypto'); // Import the crypto library for generating random tokens

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'] // Name is required
    },
    email: {
        type: String,
        unique: true, // Ensure email addresses are unique
        required: [true, 'Please add an email'] // Email is required
    },
    password: {
        type: String,
        required: [true, 'Please add a password'] // Password is required
    },
    accessToken: {
        type: String,
        default: () => crypto.randomBytes(48).toString('hex') // Generate a random access token
    }
},
    { timestamps: true }); // Include timestamps for createdAt and updatedAt

// Create a User model using the defined schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other files
module.exports = User;
