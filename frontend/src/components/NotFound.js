import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
    <Link to="/login"> Go to Login!</Link>
    <div className="not-found-container">
      <h1 className="not-found-text">Page not found!</h1>
    </div></>
  );
};

export default NotFound;
