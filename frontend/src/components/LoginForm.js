import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSecretMessage } from '../reducers/user';
import { login } from '../reducers/user';

import { SignUpForm } from './SignUpForm';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  const accessToken = useSelector(store => store.user.login.accessToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  console.log(isLogin);

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
            <a href="" onClick={handleSetLogin}>
              Sign up
            </a>
          </form>
        </>
      )}
    </main>
  );
};

//return <SignUpForm />
