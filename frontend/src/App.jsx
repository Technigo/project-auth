import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import { Secret } from './Secret';

export const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome {user.name}!</p>
          <Secret user={user} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Login onLogin={handleLogin} />
          <Register />
        </div>
      )}
    </div>
  );
};


