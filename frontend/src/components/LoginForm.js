import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../reducers/user';
import { SignUpForm } from './SignUpForm';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.login.errorMessage);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(login(email, password));
    setEmail('');
    setPassword('');
  };

  const handleSetLogin = event => {
    event.preventDefault();
    setIsLogin(false);
  };

  return (
    <main>
      {!isLogin ? (
        <SignUpForm />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                required
                type="email"
                value={email}
                placeholder="email@email.com"
                onChange={event => setEmail(event.target.value)}
              ></input>
            </label>
            <label>
              <input
                required
                type="password"
                value={password}
                placeholder="password"
                onChange={event => setPassword(event.target.value)}
              ></input>
            </label>
            <button type="submit">Login</button>
            {errorMessage && <p>{errorMessage}</p>}
            <button onClick={handleSetLogin}>Sign up</button>
          </form>
        </>
      )}
    </main>
  );
};
