// Import necessary libraries and modules
import express from 'express';
import authenticateUser from '../middlewares/authenticateUser'; // Import the authentication middleware

// Create an instance of an Express router
const router = express.Router();

// Apply the authenticateUser middleware to the '/secrets' route
router.get('/secrets', authenticateUser, (req, res) => {
    // Define an array of secrets
    const secrets = [
        'I have a hidden talent for juggling flaming torches while riding a unicycle.',
        'Every Friday night, I secretly host a karaoke party for my collection of talking houseplants.',
        'I once saved the day by using my expert knowledge of obscure trivia during a pub quiz.',
        'My guilty pleasure is binge-watching cheesy 80s sitcoms in my pajamas while eating ice cream straight from the carton.',
        'I have a secret stash of chocolate hidden in my sock drawer that I only indulge in when nobody is watching.',
        'I am a closet poet and have written a collection of love poems dedicated to my favorite type of pizza.',
        'I have a pet rock named Rocky, and we have deep philosophical conversations when no one is around.',
        'I am convinced that I have a secret admirer who leaves mysterious notes in my mailbox, but I have never found out who it is.',
        'I can speak fluent pig Latin and often use it to have private conversations in crowded places.',
        'I believe in the existence of a parallel universe where everyone communicates through interpretive dance.'
    ];

    // Select a random secret from the array
    const randomSecret = secrets[Math.floor(Math.random() * secrets.length)];

    // Respond with the selected secret
    res.json({ secret: randomSecret });
});

// Export the router for use in other files
export default router;
