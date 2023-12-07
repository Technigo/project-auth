import React, { useState } from 'react';
import AuthContainer from './components/AuthContainer';
import Dashbord from './components/Dashbord';

export const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsUserLoggedIn(true);
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
  };

  return (
    <div className="main">
      {isUserLoggedIn ? (
        <Dashbord onLogout={handleLogout} />
      ) : (
        <AuthContainer onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};
