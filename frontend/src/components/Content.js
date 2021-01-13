import React, { useState, useEffect } from 'react';
import { user } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const SECRET_URL = 'http://localhost:8080/secrets';

export const Content = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const statusMessage = useSelector((store) => store.user.login.statusMessage);

  const loginSucess = (loginResponse) => {
    dispatch(user.actions.setStatusMessage({ statusMessage: loginResponse.secretMessage }));
  };

  const loginFailed = (loginError) => {
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  };

  const logout = () => {
    dispatch(user.actions.logout);
  };

  const showSecret = () => {
    fetch(SECRET_URL, {
      method: 'GET',
      // Include the accessToken to get the protected endpoint
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Access failed';
        }
        return res.json();
      })
      .then((json) => loginSucess(json))
      .catch((err) => loginFailed(err));
  };

  return (
    <>
      <button onClick={showSecret}>Click me to reveal the secret</button>
      {/* <p>{`${statusMessage}`}</p> */}
      <button onClick={logout}>Log out</button>
    </>
  );
};