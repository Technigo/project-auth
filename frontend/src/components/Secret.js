import React, { useState, useEffect } from 'react';
import { user } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

import { FormButton, MainContainer } from 'styling/GlobalStyles';

import styled from 'styled-components';

const SECRET_URL = 'http://localhost:8080/secrets';
const LOGOUT_URL = 'http://localhost:8080/logout';

export const Secret = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const statusMessage = useSelector((store) => store.user.login.statusMessage);

  const loginSucess = (loginResponse) => {
    dispatch(user.actions.setStatusMessage({ statusMessage: loginResponse.secretMessage }));
  };

  const loginFailed = (loginError) => {
    dispatch(user.actions.setStatusMessage({ statusMessage: loginError }));
  };

  const logoutSuccess = () => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: 'Logout Succeded',
      })
    );
    dispatch(user.actions.setAccessToken({ accessToken: null }));
  };

  const logoutFailed = () => {
    dispatch(
      user.actions.setStatusMessage({
        statusMessage: logoutError,
      })
    );
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

  const logout = () => {

  };

  return (
    <SecretContainer>
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

const SecretButton = styled(FormButton)`
  background: #fff;
  color: #00544F;
  padding: 15px;
  border: 1px solid #00544F;
  width: 180px;
  font-size: 14px;
`;

const Gift = styled.p`
  font-size: 60px;
  align-self: center;
`;

const LogOutButton = styled(FormButton)``;