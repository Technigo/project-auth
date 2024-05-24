import atob from "atob"; // Import the atob function to decode base64 strings
import Blacklist from "../model/blacklist-model.js"; // Import the Blacklist model

// Remove expired tokens from the blacklist to avoid memory leaks, and schedule the next cleanup in an hour
//clutter free db please. my server is not a hoarder
const cleanupBlacklist = () => {
  const now = Date.now() / 1000; // Get the current time in seconds

  // Find all tokens in the blacklist
  Blacklist.find()
    .then((tokens) => {
      // Filter out tokens that have expired
      const validTokens = tokens.filter((token) => {
        let payload;
        try {
          const parts = token.token.split(".");
          if (parts.length !== 3) {
            throw new Error("Invalid token");
          }
          payload = JSON.parse(atob(parts[1]));
        } catch (error) {
          console.error("Error parsing token payload: ", error);
          return false; // Skip this token if there's an error
        }

        return payload.exp > now;
      });

      // Remove expired tokens from the blacklist - wish it was this easy in real life
      const expiredTokens = tokens.filter(
        (token) => !validTokens.includes(token)
      );
      expiredTokens.forEach((token) => {
        Blacklist.deleteOne({ _id: token._id }).catch((error) =>
          console.error(error)
        );
      });
    })
    .catch((error) => console.error(error));

  // Schedule the next cleanup - Cinderella, you shall go to the ball but be back in an hour
  setTimeout(cleanupBlacklist, 60 * 60 * 1000); // Clean up every hour
};

// Start the cleanup schedule - Cinderella, mop the floor and clean the windows of dirty tokens
cleanupBlacklist();

export { cleanupBlacklist };
