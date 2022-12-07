import React from 'react';
import { Link } from 'react-router-dom'

export const Main = () => {
  return (
    <div>
        <p>Sign up to get access to all the dreamy content! 🦄</p>
        <Link to='/signup'>
            <button type="button">Sign up</button>
        </Link>
        <p>Already a member? 😎 Log in to your account.</p>
        <Link to='/login'>
            <button type="button">Log in</button>
        </Link>
    </div>
  );
}