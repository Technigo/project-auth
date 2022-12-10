import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Link to='/login'>Register / Login</Link>
      <h1>Not Found...</h1>
    </>
  );
};

export default NotFound;
