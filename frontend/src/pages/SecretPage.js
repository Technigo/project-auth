import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { user, getSecretMessage, logout } from '../reducers/user';

// Restricted page, only accessible after succesfully signing or logging in.
// So only accesible when a valid access token has been saved to the global store
// In order to get the secret message, we dispatch the getSecretMessage thunk
// upon loading the page via useEffect. It carries the values for user ID and 
// access token which we retrieved from the global store.
// This thunk will do a fetch to the secret endpoint and if successful, we get the
// secret message in the response, which we then save in the global store

export const SecretPage = ({ setPage }) => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);
  const secretMessage = useSelector((store) => store.user.secretMessage);

  // Dispatch the getSecretMessage thunk as soon as the page loads so we can
  // get the secret message right away and show it to the user
  useEffect(() => {
    dispatch(user.actions.setErrorMessage({ errorMessage: null }));
    dispatch(getSecretMessage(userId, accessToken));
  });

  // Log out button click will call the logout thunk, reset all values
  // and take us back to the sign up page
  const handleClick = () => {
    dispatch(logout());
    setPage('signup');
  };

  return (
    <>
      <h1>Uhhhh Secret Page...</h1>
      <h2>{`${secretMessage}`}</h2>
      <button type="button" onClick={handleClick}>LOG OUT</button>
    </>
  );
};
