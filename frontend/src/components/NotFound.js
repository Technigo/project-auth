import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <>
         <p>
            <Link to="/login">Go to login</Link>
         </p>
          <p>
             <Link to="/">Go to main</Link>
          </p>
          <p> Sorry i am a not found component...</p>
        </>
       
    );
}

