import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={onFormSubmit}>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {/* <Link to="/login"/> */}
        <button>Login</button>
        <Link to="/registration">
          <button>Register</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
