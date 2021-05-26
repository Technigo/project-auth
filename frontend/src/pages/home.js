import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../store/session';

export default () => {
  const dispatch = useDispatch();
  const secret = 'nothing';

  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <main>
      <h1>Home page</h1>
      <p>{secret}</p>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </main>
  );
};
