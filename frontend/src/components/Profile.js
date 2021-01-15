import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSecretMessage, logout } from '../reducers/user';

export const Profile = () => {
  const dispatch = useDispatch();
  const secretMessage = useSelector(store => store.user.login.secretMessage);
  const errorMessage = useSelector(store => store.user.login.errorMessage);
  const name = useSelector(store => store.user.login.name);

  return (
    <section>
      <p>{`Hello ${name}! Click to reveal secret message`}</p>
      <button type="button" onClick={() => dispatch(getSecretMessage())}>
        Secret message
      </button>
      {secretMessage && <p>{secretMessage}</p>}
      <button onClick={() => dispatch(logout())}>Logout</button>
      {errorMessage && <p>{errorMessage}</p>}
    </section>
  );
};
