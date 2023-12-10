import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import { Secret } from './Secret';

//components
import { Button } from './components/Button';
import { Heading } from './components/Heading';

export const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="text-center flex flex-col items-center justify-center h-screen bg-indigo-300">
      {user ? (
        <div>
          <Heading text={`Welcome ${user.name}!`} size="xl" />

          <Secret user={user} />
          <Button onClick={handleLogout} text="Logout" />
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
