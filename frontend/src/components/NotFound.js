import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container">
      <h1 className="header">Page not found</h1>
      <Link to="/">
        <button className="button">Go back</button>
      </Link>
    </div>
  );
};

export default NotFound;
