// userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    secretKey: { type: String },
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        } catch (error) {
            next(error);
        }
    }
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', userSchema);

export default User;




// userModel.js
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// // Define the user schema
// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         unique: true,
//         required: true,
//         trim: true,
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     accessToken: {
//         type: String,
//     },
// });

// // Mongoose middleware to hash the password before saving to the database
// userSchema.pre('save', async function (next) {
//     const user = this;

//     if (user.isModified('password')) {
//         try {
//             const hashedPassword = await bcrypt.hash(user.password, 10);
//             user.password = hashedPassword;
//         } catch (error) {
//             next(error);
//         }
//     }

//     next();
// });

// // Create a method to compare entered password with hashed password in the database
// userSchema.methods.comparePassword = async function (enteredPassword) {
//     try {
//         return await bcrypt.compare(enteredPassword, this.password);
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// // Create the User model using the user schema
// const User = mongoose.model('User', userSchema);

// // Export the User model for use in other files
// export default User;



// 'userModel.js':
// Contains a Mongoose middleware (pre-save hook) that automatically hashes the password before saving it to the database.
// This middleware is applied to the User schema using userSchema.pre('save', ...).
// The hashed password is stored in the database.


//In cryptography, a "salt" is random data that is generated and used as an additional input to a one-way function (in this case, a password hashing function). The primary purpose of using a salt is to defend against dictionary attacks, pre-computed rainbow table attacks, and similar techniques.


// Explanation of key points:
// userSchema: This defines the structure of the user document in the MongoDB collection. It includes fields for username, password, and accessToken.
// pre('save') middleware: This middleware runs before saving a new user or updating an existing user. It hashes the password using bcrypt before saving it to the database.
// comparePassword method: This method is added to the user schema to compare entered passwords with the hashed password stored in the database.
// User model: This is created using the mongoose.model function, which takes the model name ('User') and the user schema.

