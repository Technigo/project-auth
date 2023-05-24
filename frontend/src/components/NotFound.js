import React from "react";
import { Link } from "react-router-dom";

// The NotFound component represents a page for handling 404 errors or when a route is not found.

const NotFound = () => {
    return (
        <>
            {/* Link to the login page */}
            <p>
                <Link to="/login">GO TO LOGIN</Link>
            </p>

            {/* Link to the main page */}
            <p>
                <Link to="/">GO TO MAIN</Link>
            </p>

            {/* Display a message indicating that nothing is found */}
            <p>Sorry, nothing here...</p>
        </>
    );
}

export default NotFound;
