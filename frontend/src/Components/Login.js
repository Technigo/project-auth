import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import { API_URL } from 'utils/url';
import user from '../reducers/user';

export const Login = () => {
  const [username, setUsername] = UseState('');
  const [password, setPassword] = UseState('');
  const [mode, setMode] = useState('signup');

  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL('mode'), options)
      .then((res) => res.json)
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setError(data.response));
        }
      });
  };

  //har ej implementerat formuläret från lektionen

  return (
    <>
      <Link to={`/`} className="Link">
        Go to the Register page
      </Link>

      <Form>
        <label>
          <h2>Login</h2>
        </label>
        <Input type="text" placeholder="Username"></Input>
        <Input type="password" placeholder="Password"></Input>
        <Button>Login</Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background-color: #92dea0;
  padding: 5px;
  margin: 15px;
  border: none;
  border-bottom: 2px solid black;
  width: 300px;
  text-transform: uppercase; 

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: black;s
    opacity: 1; /* Firefox */
    font-family: var(--font);
  }
`;

const Button = styled.button`
  background-color: #92dea0;
  align-self: center;
  width: fit-content;
  padding: 5px 15px;
  margin: 10px;
  font-size: 1em;
  padding: 5px;
  border: 2px solid black;
  text-transform: uppercase;

  :hover {
    background-color: #1e9086;
    transform: rotate(360deg);
    transition: 0.5s ease;
  }

  /* Small laptop */
  @media (min-width: 992px) {
  }
`;
