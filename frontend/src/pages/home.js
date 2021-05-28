import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logoutUser } from '../store/session';
import { setUser, userSelector } from '../store/user';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { name, email } = useSelector(userSelector);

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(setUser(null));
    history.push('/login');
  };

  return (
    <main>
      <h1>Welcome {name}</h1>
      <p>Your currently registered email is: {email}</p>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </main>
  );
};
