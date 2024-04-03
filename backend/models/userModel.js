import mongoose from "mongoose";
import crypto from "crypto"; //  Imports the Node.js crypto library for generating secure random strings.

// Import the Schema class from the Mongoose library
// Destructures the Schema class from the Mongoose library, allowing us to create a schema.
const { Schema } = mongoose;

// Create a new Mongoose schema named 'userSchema'
// Creates a new Mongoose schema named userSchema that defines the structure of a user document in the MongoDB collection. It includes fields like username, password, and accessToken, specifying their data types, validation rules, and default values.
const userSchema = new Schema(
    {
        // Define the 'username' field with a String data type
        username: {
            type: String, // Specifies that 'username' should be a string
            required: true, // Indicates that 'username' is a required field
            unique: true, // Ensures that 'username' values are unique
            minlength: 2, // Sets a minimum length of 2 characters for 'username'
        },
        // Define the 'password' field with a String data type
        password: {
            type: String, // Specifies that 'password' should be a string
            required: true, // Indicates that 'password' is a required field
            minlength: 6, // Sets a minimum length of 6 characters for 'password'
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        //Define the 'accessToken' field with a String data type
        accessToken: {
            type: String, // Specifies that 'accessToken' should be a string
            default: () => crypto.randomBytes(128).toString("hex"), // Sets a default value using a cryptographic random string
        },
    },
    {
        timestamps: true,
    }
);

// Create a Mongoose model named 'UserModel' based on the 'userSchema' for the 'users' collection
// This model is used to interact with the "users" collection in the MongoDB database. It allows you to perform CRUD operations on user documents and provides methods for data validation based on the schema.
export const UserModel = mongoose.model("User", userSchema);

// In summary, this code defines a Mongoose schema (userSchema) that describes the structure of documents for users in a MongoDB collection. It also creates a Mongoose model (UserModel) associated with the "users" collection, which can be used to interact with the database and perform operations like creating, reading, updating, and deleting user documents.










// // userModel.js
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// const userSchema = new mongoose.Schema({
//     username: { type: String, unique: true, required: true },
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
//     secretKey: { type: String },
// });

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

// userSchema.methods.comparePassword = async function (enteredPassword) {
//     try {
//         return await bcrypt.compare(enteredPassword, this.password);
//     } catch (error) {
//         throw new Error(error);
//     }
// };

// const User = mongoose.model('User', userSchema);

// export default User;




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

