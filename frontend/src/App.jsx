import React, { useState } from "react";
import AuthContainer from "./components/AuthContainer";

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
        <div>
          <h1>Welcome!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <AuthContainer onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};
