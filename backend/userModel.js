// Import necessary libraries
import mongoose from 'mongoose'; // Mongoose is an ODM (Object Document Mapper) for MongoDB
import bcrypt from 'bcrypt'; // Bcrypt is used for password hashing

// Define the User schema
const userSchema = new mongoose.Schema({
    // Define the structure of the User model
    username: {
        type: String,
        required: true, // Username is a required field
        unique: true, // Username must be unique
        trim: true, // Trim leading and trailing whitespaces
    },
    email: {
        type: String,
        required: true, // Email is a required field
        unique: true, // Email must be unique
        trim: true, // Trim leading and trailing whitespaces
    },
    password: {
        type: String,
        required: true, // Password is a required field
        trim: true, // Trim leading and trailing whitespaces
    },
    accessToken: {
        type: String,
    },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;

    // Hash the password only if it's modified or a new user
    if (user.isModified('password') || user.isNew) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password with a salt factor of 10
            user.password = hashedPassword; // Replace the plain password with the hashed one
        } catch (error) {
            throw error; // Throw an error if hashing fails
        }
    }

    next(); // Continue with the save operation
});

// Create a method to compare passwords during login
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    // Use bcrypt to compare the entered password with the hashed password
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
        if (error) {
            return callback(error); // Return an error if the comparison fails
        }
        callback(null, isMatch); // Return whether the passwords match
    });
};

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
export default User;
