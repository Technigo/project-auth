// Import the UserModel from the User model file
import { UserModel } from "../models/userModel";
// Define a function called authenticateUser that takes a request (req), response (res), and a next function as parameters
export const authenticateUser = async (req, res, next) => {
  // Retrieve the access token from the request header
  const accessToken = req.header("Authorization");
  try {
    // Find a user in the database using the retrieved access token
    // Mongoose Method: UserModel.findOne({ accessToken: accessToken })
    // Description: This line of code serves the purpose of authenticating a user based on the provided access token. It checks if a user with the specified accessToken exists in the database using the UserModel. If a user is found, their user document is stored in the user variable. This allows the middleware to add the user object to the request, making it available for subsequent middleware or routes. If no user is found, it prepares to send a 401 Unauthorized response to indicate that the user needs to log in. This code is an essential part of user authentication in the Node.js application and helps control access to protected routes or endpoints.
    const user = await UserModel.findOne({ accessToken: accessToken });
    if (user) {
      // If a user is found, add the user object to the request object
      req.user = user; // Add user to the request object
      next(); // Continue to the next middleware or route
    } else {
      // If no user is found, send a 401 Unauthorized response
      res.status(401).json({ success: false, response: "Please log in" });
    }
  } catch (e) {
    // Handle any errors that occur during the database query or user authentication
    res.status(500).json({ success: false, response: e.message });
  }
};

// SUMMARY

//In this code, we have a function called authenticateUser that is used as middleware in a Node.js application. This middleware is responsible for checking the authorization header of an incoming request, searching for a user with the provided access token in the database using the UserModel, and adding the user object to the request if found. If no user is found or if there are any errors during the process, appropriate responses are sent back to the client. In summary, this code is handling user authentication by checking the access token in the request header and verifying it against the database to grant access to protected routes or endpoints.












// // authMiddleware.js
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel';

// const authenticateUser = async (req, res, next) => {
//     const { authorization } = req.headers;

//     try {
//         console.log('Received token:', authorization);
//         if (!authorization || !authorization.startsWith('Bearer ')) {
//             return res.status(401).json({ error: 'Unauthorized - Missing or invalid token' });
//         }

//         const token = authorization.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         if (!decoded || !decoded.userId) {
//             return res.status(401).json({ error: 'Unauthorized - Invalid token content' });
//         }

//         // Attach the user to the request object
//         req.user = await User.findById(decoded.userId);

//         if (!req.user) {
//             return res.status(401).json({ error: 'Unauthorized - User not found' });
//         }

//         next();
//     } catch (error) {
//         console.error('Error during token verification:', error);
//         res.status(401).json({ error: 'Unauthorized - Token verification failed' });
//     }
// };

// export default authenticateUser;








// authMiddleware.js
// import User from '../models/userModel';
// import jwt from 'jsonwebtoken';
// import crypto from 'crypto';

// // Middleware to handle user authentication
// const authenticateUser = async (req, res, next) => {
//     const { authorization } = req.headers;

//     try {
//         if (!authorization || !authorization.startsWith('Bearer ')) {
//             return res.status(401).json({ error: 'Unauthorized' });
//         }

//         const token = authorization.split(' ')[1];
//         const secretKey = generateRandomKey();

//         const decoded = jwt.verify(token, secretKey);

//         const user = await User.findById(decoded.userId);

//         if (!user) {
//             return res.status(401).json({ error: 'Unauthorized' });
//         }

//         req.user = user;

//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Unauthorized' });
//     }
// };

// // Function to generate a random secret key
// const generateRandomKey = () => {
//     return crypto.randomBytes(32).toString('hex');
// };

// export default authenticateUser;


// 'authUser.js':
// Uses the comparePassword method from the User model to check if the entered password matches the hashed password stored in the database.
// This middleware is applied to routes where user authentication is required.



//Explanation:This middleware defines a route ('/login') for handling user login.
// It retrieves the username and password from the request body.
// It searches for the user in the database by the provided username.
// If the user is found, it compares the entered password with the hashed password in the database using the comparePassword method from the 'userModel.js'.
// If the credentials are valid, it generates an access token (you need to replace the placeholder with your actual token generation logic) and attaches it to the user in the database.
// The middleware then sends a response with the access token.

