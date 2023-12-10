// Import the jsonwebtoken library for JWT token generation and verification
import jwt from 'jsonwebtoken';

// Function to generate a JWT token based on a given payload
const generateToken = (payload) => {
    // Sign the payload with the JWT secret and set expiration to 1 hour
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Function to verify the validity of a JWT token
const verifyToken = (token) => {
    // Verify the token using the JWT secret
    return jwt.verify(token, process.env.JWT_SECRET);
};

// Export the generateToken and verifyToken functions for use in other files
export { generateToken, verifyToken };
