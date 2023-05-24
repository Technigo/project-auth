import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <Link to="/login">GO TO LOGIN</Link>
            <Link to="/">GO TO MAIN</Link>
            <p>Sorry nothing here...</p>
        </>
    )
}

export default NotFound