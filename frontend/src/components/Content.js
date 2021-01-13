import React, { useState, useEffect } from 'react';
import { user } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const URL = 'http://localhost:8080/secrets';

export const Content = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const statusMessage = useSelector((store) => store.user.login.statusMessage);
  const secret = useSelector((store) => store.user.login.secret);

  const loginSucess = (json) => {
    dispatch(user.actions.setSecret({ secret: json.secret }));
  };

  const loginFailed = (loginError) => {
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  };

  const logout = () => { };


  fetch(URL, {
    method: 'GET',
    headers: { Authorization: accessToken },
  })
    .then((res) => {
      if (!res.ok) {
        throw 'Access failed';
      }
      return res.json();
    })
    .then((json) => loginSucess());
  // .catch ((err) => loginFailed(err));
  console.log(secret)

  return (
    <>
      {secret}
    </>
  );
};