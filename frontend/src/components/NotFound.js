import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
return (
    <> 
      <p> 
         Sorry, nothing here...
      </p>
      <p>
         <Link to="/login"> Go to Login</Link>
      </p>
      <p>
         <Link to="/"> Go to Main</Link>
      </p>

    </>
)
}

export default NotFound;