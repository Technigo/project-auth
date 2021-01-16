import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSecretMessage, login } from '../reducers/user';
import { SignUpForm } from './SignUpForm';
import '../styles/style.css'

export const LoginForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  const userId = useSelector(store => store.user.login.userId);

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
    <main className="main-container">
      {!isLogin ? (
        <SignUpForm />
      ) : (
        <>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-text-input-fields"> 
              <label>
                <input
                  className="text-input-field"
                  required
                  type="email"
                  value={email}
                  placeholder="email@email.com"
                  onChange={event => setEmail(event.target.value)}
                ></input>
              </label>
              <label>
                <input
                  className="text-input-field"
                  required
                  type="password"
                  value={password}
                  placeholder="password"
                  onChange={event => setPassword(event.target.value)}
                ></input>
              </label>
            </div>
            <div className="form-buttons"> 
              <button className="form-button" type="submit">Login</button>
              {errorMessage && <p>{errorMessage}</p>}
              <button className="link-button" onClick={handleSetLogin}>
                <span className="link-button-text">
                  Not a member? Sign up here
                </span>
              </button>
            </div>
          </form>
        </>
      )}
    </main>
  );
};
