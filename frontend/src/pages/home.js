import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logoutUser, sessionSelector } from '../store/session';
import { setUser, userSelector } from '../store/user';
import { setSecret, secretSelector, getSecret } from '../store/secret';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { name, email } = useSelector(userSelector);
  const { accessToken } = useSelector(sessionSelector);
  const { message, errorMessage } = useSelector(secretSelector);

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(setUser(null));
    dispatch(setSecret(''));
    history.push('/login');
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getSecret(accessToken))
    }
  }, [accessToken]);

  return (
    <main>
      <h1>Welcome {name}</h1>
      <p>Your currently registered email is: {email}</p>
      {message ? <p>{message}</p> : <p>{errorMessage}</p>}
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </main>
  );
};
