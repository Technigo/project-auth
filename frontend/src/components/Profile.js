import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSecretMessage, logout } from '../reducers/user';
import { Button } from './Button';
import '../styles/style.css';

export const Profile = () => {
  const dispatch = useDispatch();
  const secretMessage = useSelector(store => store.user.login.secretMessage);
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  const name = useSelector(store => store.user.login.name);

  return (
    <main className="main-container">
      <div className="content">
        <p>{`Hello ${name}! Click to reveal secret message`}</p>
        <Button
          type="button"
          onClick={() => dispatch(getSecretMessage())}
          className="form-button"
          text="Secret message"
        />
        {secretMessage && <p>{secretMessage}</p>}
        <Button
          type="button"
          onClick={() => dispatch(logout())}
          className="form-button"
          text="Logout"
        />
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </main>
  );
};
