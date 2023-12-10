// Import the jsonwebtoken library for JWT verification
import jwt from 'jsonwebtoken';

// Define a middleware function for authenticating users based on the access token
const authenticateUser = async (req, res, next) => {
    try {
        // Extract the access token from the Authorization header
        const accessToken = req.header('Authorization');

        // Check if an access token is provided
        if (!accessToken) {
            return res.status(401).json({ loggedOut: true, message: 'No access token provided' });
        }

        // Verify the access token using the JWT library and the secret key
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        // Handle errors during authentication

        console.error('Authentication Error:', error);

        // Respond with a 401 status for invalid access token
        res.status(401).json({ loggedOut: true, message: 'Invalid access token' });
    }
};

// Export the authenticateUser middleware for use in other files
export default authenticateUser;
