import React, { useState } from 'react';
import { user } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

export const Secret = () => {
  const URL = 'http://localhost:8080/secrets';
  const dispatch = useDispatch();
  const name = useSelector((store) => store.user.login.name);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const statusMessage = useSelector((store) => store.user.login.statusMessage);
  /* const [error, setError] = useState(false) */

  const loginSuccess = (loginResponse) => {
    const statusMessage = `Authenticated Endpoint: ${JSON.stringify(
      loginResponse
    )}`;
    dispatch(user.actions.setStatusMessage({ statusMessage }));
    console.log('yay')
  };

  const loginFailed = (loginError) => {
    const statusMessage = `Authenticated Endpoint Failed: ${JSON.stringify(
      loginError
    )}`;
    dispatch(user.actions.setStatusMessage({ statusMessage }));
    console.log('nay')
  };

  const logout = () => {
    dispatch(user.actions.logout());
  };

  const login = () => {
    fetch(URL, {
      method: 'GET',
      headers: { Authorization: accessToken },
    })
      /* .then((res) => {
        if (!res.ok) {
          setError(true)
        } else {
          setError(false)
          return res.json()
        }
      }) */
      .then(res => res.json())
      .then((json) => loginSuccess(json))
      .catch((err) => loginFailed(err));
  };

  login()

  /* if (error === false) {
    console.log('hejhej') */
    return (
      <div>
        <h1>{`Hi ${name}!`}</h1>
         <h1>{statusMessage}</h1>
        <Link to='/'>
          <input type="submit" onClick={logout} value="Logout" />
        </Link>
      </div>
    )
  /* } else {
    console.log('fel')
    return <Redirect to='/' />
  } */
};