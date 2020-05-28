// import React, { useState } from 'react';
import React from 'react';
import { user } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';


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
      <Container>
        <Wrapper>
          <TextMessage>{`Hi ${name}!`}</TextMessage>
          <TextMessage>{statusMessage}</TextMessage>
          <Link to='/'>
            <input type="submit" onClick={logout} value="Logout" />
          </Link>
        </Wrapper>
      </Container>
    )
  /* } else {
    console.log('fel')
    return <Redirect to='/' />
  } */
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