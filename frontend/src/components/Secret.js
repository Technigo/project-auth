import React from 'react';
import { user } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

import { FormButton, MainContainer } from 'styling/GlobalStyles';

import styled from 'styled-components';

const SECRET_URL = 'https://reveal-secrets-gabriella-sara.herokuapp.com/secrets';
const LOGOUT_URL = 'https://reveal-secrets-gabriella-sara.herokuapp.com/users/logout';

export const Secret = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);

  const loginSucess = (loginResponse) => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: loginResponse.secretMessage
      })
    );
  };

  const loginFailed = (loginError) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  };

  const logoutSuccess = () => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: 'Log Out Succeded',
      })
    );
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    window.location.reload();
  };

  const logoutFailed = () => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: 'Log Out failed',
      })
    );
  };

  // Fetch to show the secret content
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

  const logout = () => {
    fetch(LOGOUT_URL, {
      method: 'POST',
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Failed to Log Out';
        }
        return res.json();
      })
      .then((json) => logoutSuccess(json))
      .catch((err) => logoutFailed(err));
  };

  return (
    <SecretContainer>
      <WelcomeMessage>Welcome!</WelcomeMessage>
      <SecretButton onClick={showSecret}>
        Click me to reveal the secret!
      </SecretButton>
      <Gift role="img" aria-label="emoji"> 🎁 </Gift>
      <LogOutButton onClick={logout}>Log Out</LogOutButton>
    </SecretContainer>
  );
};

const SecretContainer = styled(MainContainer)`
  background: #fff;
  color: #00544F;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const WelcomeMessage = styled.h3``;

const SecretButton = styled(FormButton)`
  background: #fff;
  color: #00544F;
  padding: 15px;
  border: 1px solid #00544F;
  width: 180px;
  font-size: 14px;
`;

const Gift = styled.span`
  font-size: 60px;
  align-self: center;
  margin: 0;
`;

const LogOutButton = styled(FormButton)``;