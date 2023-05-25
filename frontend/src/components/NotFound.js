import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {

  return (
    <>
      <p>
        <Link to="/login">GO TO LOGIN</Link>
      </p>
      <p>
        <Link to="/">GO TO MAIN</Link>
      </p>
      <p>Sorry, nothing to see here...</p>
    </>
  );
}

export default NotFound;