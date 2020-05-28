import React from 'react';
import { user, logout } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const URL = 'http://localhost:8080/secrets';

export const Secret = () => {
  const dispatch = useDispatch();
  const name = useSelector((store) => store.user.login.name);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const secretMessage = useSelector((store) => store.user.login.secretMessage);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);

  const getSecret = () => {
    fetch(URL, {
      method: 'GET',
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } 
        throw 'Could not get information. Make sure you are logged in and try again';
      })
      .then((json) => {
        dispatch(
          user.actions.setSecretMessage({ secretMessage: JSON.stringify(json) })
        )
      })
      .catch((err) => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err})
        )
      })
  };

    return (
      <Container>
        <Wrapper>
          <TextMessage>{`Hi ${name}!`}</TextMessage>
          <TextMessage>{secretMessage}</TextMessage>
          <TextMessage>{errorMessage}</TextMessage>
          <input 
            type="submit" 
            onClick={(e) => getSecret()} 
            value="Reveal secret!" 
          />
          <Link to='/'>
            <input 
              type="submit" 
              onClick={(e) => dispatch(logout())} 
              value="Logout" 
            />
          </Link>
        </Wrapper>
      </Container>
    )
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #355C7D;
  height: 500px;
  color:  white;
`;

const Wrapper = styled.div`
  margin: 15px 0;
  width: 95%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: RGBA(248,177,149,1);
  border-radius: 6px;
  @media (min-width: 668px) {
    width: 80%;
    padding: 20px 40px;
  }
  @media (min-width: 800px) {
    width: 60%;
  }
  @media (min-width: 992px) {
    width: 50%;
  }
`;

const TextMessage = styled.p`
  margin: 15px 0 8px 0;
  font-size: 20px;
  font-weight: bold;
  color:  black;
`;