import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container">
      <h1 className="header">Not found page</h1>
      <Link to="/">
        <button className="button">Go back</button>
      </Link>
    </div>
  );
};

export default NotFound;
