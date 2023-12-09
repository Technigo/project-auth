import React from 'react';

const SignOutButton = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <button onClick={handleLogout}>Sign Out</button>
  );
};

export default SignOutButton;
