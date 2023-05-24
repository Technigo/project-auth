import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {

    return(
        <>
            <p>
            <Link to='/login'>Go to Login</Link>
            </p>
            <p>
            <Link to='/'>Go to main</Link>
            </p>
        <p>Sorry, nothing here to see...</p>
        </>
    )
}

export default NotFound