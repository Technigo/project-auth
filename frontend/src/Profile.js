import React from 'react';
import { user, logout, loggedoutMessage } from './reducers/user';
import { useDispatch, useSelector } from 'react-redux';

export const Profile = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);
  const loginMessage = useSelector((store) => store.user.login.loginMessage);

  return (
    <div>
      {errorMessage && <h4>Error Message : {`${errorMessage}`}</h4>}
      {loginMessage && <h4>Secret Message : {`${loginMessage}`}</h4>}
      <p>profilepage</p>
      <p>Lots of secret stuff here</p>
      <button type='submit' onClick={(e) => dispatch(logout())}>
        LOG OUT
      </button>
    </div>
  );
};
