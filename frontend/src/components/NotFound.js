import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Link to='/login'>Register – Log in</Link>
      <h2>404 Page Not Found</h2>
      <span>😶‍🌫️</span>
    </>
  );
};

export default NotFound;
