import React, { useState } from 'react';
import AuthContainer from './components/AuthContainer';
import Dashboard from './components/Dashbord';

export const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const handleLoginSuccess = (token) => {
    setIsUserLoggedIn(true);
    setAccessToken(token);
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    setAccessToken('');
  };

  return (
    <div className="main">
      {isUserLoggedIn ? (
        <Dashboard accessToken={accessToken} onLogout={handleLogout} />
      ) : (
        <AuthContainer onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};
