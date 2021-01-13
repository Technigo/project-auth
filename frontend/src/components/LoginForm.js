import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((store) => store.user.login.errorMessage);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // To login a user.
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <form>
        <h1>Login</h1>
        <label>
          email
          <input
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          password
          <input
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
      <Link to="/signup">
        <button>Not a member?</button>
      </Link>
      {errorMessage && <h4>Error Message : {`${errorMessage}`}</h4>}
    </div>
  );
};
export default LoginForm;
