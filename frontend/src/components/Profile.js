import React, { useState, useEffect } from 'react';
import { user } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const URL = 'http://localhost:8080/users';
const SECRET_URL = 'http://localhost:8080/secret';

export const Profile = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId);
  const statusMessage = useSelector((store) => store.user.login.statusMessage)
  const name = useSelector((store) => store.user.login.name)

  const loginSuccess = (loginResponse) => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: loginResponse.secretMessage,
      })
    )
  }

  const loginFailed = (loginError) => {
    dispatch(
      user.actions.setAccessToken({ accessToken: null}) //Does this have to be set to null if login fails?
    )
    dispatch(
      user.actions.setStatusMessage({ statusMessage: loginError })
    )
  }

  const logoutSuccess = () => {
    dispatch(
      user.actions.setStatusMessage({ 
        statusMessage: 'Logout success',
    })
    )
    dispatch(user.actions.setAccessToken({ accessToken: null }))
  }

  const logoutFailed = (logoutError) => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: logoutError,
      })
    )
  }

  const logout = () => {
    fetch(`${URL}/logout`, {
      method: 'POST',
      headers: { Authorization: accessToken},
    })
    .then((res) => {
      if(!res.ok) {
        throw 'Failed to logout';
      }
      return res.json();
    })
    .then((json) => logoutSuccess(json))
    .catch((err) => logoutFailed(err));
  }

  const getSecret = () => {
    fetch(`${URL}/${userId}/secret`, {
      method: 'GET',
      headers: { Authorization: accessToken },
    })
    .then((res) => {
      if (!res.ok) {
        throw 'Failed to retrieve secret';
      }
      return res.json();
    })
    .then((json) => loginSuccess(json))
    .catch((err) => loginFailed(err)) // 401 in backend
  };

  return (
    <section>
      <p>`Hello ${name} This is your secret message: ${statusMessage}`</p>
    </section>
  )
}




