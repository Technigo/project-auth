import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../reducers/user';
import { Wrapper, Form } from 'lib';

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
    <Wrapper>
      <Form>
        <label>
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </Form>
      <Link to="/signup">
        <button type="submit">Not a member?</button>
      </Link>
      {errorMessage && <p>{`${errorMessage}`}</p>}
    </Wrapper>
  );
};
export default LoginForm;
