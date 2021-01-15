import React from 'react';
import { user } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

//const URL = 'http://localhost:8080/users';
import { getSecretMessage, logout } from '../reducers/user';

export const Profile = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(store => store.user.login.accessToken);
  //const userId = useSelector(store => store.user.login.userId);
  const secretMessage = useSelector(store => store.user.login.secretMessage);
  const name = useSelector(store => store.user.login.name);
  console.log(secretMessage, name);

  // const loginSuccess = loginResponse => {
  //   dispatch(
  //     user.actions.setStatusMessage({
  //       statusMessage: loginResponse.secretMessage,
  //     })
  //   );
  // };

  // const loginFailed = loginError => {
  //   dispatch(
  //     user.actions.setAccessToken({ accessToken: null }) //Does this have to be set to null if login fails?
  //   );
  //   dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  // };

  // const logoutSuccess = () => {
  //   dispatch(
  //     user.actions.setStatusMessage({
  //       statusMessage: 'Logout success',
  //     })
  //   );
  //   dispatch(user.actions.setAccessToken({ accessToken: null }));
  // };

  // const logoutFailed = logoutError => {
  //   dispatch(
  //     user.actions.setStatusMessage({
  //       statusMessage: logoutError,
  //     })
  //   );
  // };

  return (
    <section>
      <p>{`Hello ${name}! Click to reveal secret message`}</p>
      <button
        type="button"
        onClick={() => dispatch(getSecretMessage())}
      >Secret message</button>
      {secretMessage && <p>{secretMessage}</p>}
      <button onClick={() => dispatch(logout())}>Logout</button>
    </section>
  );
};
