// authMiddleware.js
import jwt from 'jsonwebtoken';

const authenticateUser = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        console.log('Received token:', authorization);
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized - Missing or invalid token' });
        }

        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token content' });
        }

        // Attach the user to the request object
        req.user = await User.findById(decoded.userId);

        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized - User not found' });
        }

        next();
    } catch (error) {
        console.error('Error during token verification:', error);
        res.status(401).json({ error: 'Unauthorized - Token verification failed' });
    }
};

export default authenticateUser;








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

