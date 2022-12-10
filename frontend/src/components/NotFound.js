import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
    <>
        <Link to="/login"> GO TO LOGIN
        <h1>Not Found...</h1>
        <button>go to login</button>
        </Link>
    </>
    ) 
}

export default NotFound;