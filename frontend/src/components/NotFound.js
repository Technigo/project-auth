import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <p>
        <Link to="/login">Go to login</Link>
      </p>
      <p>
        <Link to="/main">Go to login</Link>
      </p>
      <p>Sorry nothing here...</p>
    </div>
  );
};

export default NotFound;
