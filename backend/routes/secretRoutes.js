import express from 'express';
import authenticateUser from './authUser'; // Import the authentication middleware

// Create an instance of the Express Router
const router = express.Router();

// Route for accessing the secret content ('/secret')
router.get('/secret', authenticateUser, async (req, res) => {
    try {
        // Access the authenticated user from the request object
        const authenticatedUser = req.user;

        // You can now use the authenticatedUser to fetch user-specific content from the database
        // For simplicity, let's just return a success message
        res.json({ message: `Hello, ${authenticatedUser.username}! Welcome to the secret route.` });
    } catch (error) {
        // Handle any errors that may occur
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router for use in other files
export default router;

// Explanation:

// The '/secret' route is defined with a router.get method, indicating that it responds to HTTP GET requests.
// authenticateUser is used as middleware for this route. It ensures that only authenticated users can access this route. You can place this middleware on any route that requires authentication.
// Inside the route handler, you can access the authenticated user through req.user. This is possible because the authenticateUser middleware attaches the user to the request object.