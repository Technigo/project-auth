import React from 'react';

const Dashboard = ({ user, setToken }) => {
  const handleSignOut = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <div>
      <p>Welcome, {user?.username}</p>
      <button onClick={handleSignOut}>Sign Out</button>

    </div>
  );
};

export default Dashboard;
