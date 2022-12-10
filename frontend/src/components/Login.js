import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from 'reducers/user';
import { ContentContainer, Wrapper } from './styledComponents/Containers';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.user.accessToken);
  const errorMessage = useSelector((store) => store.user.error);

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(logIn(mode, username, password));
  };

  return (
    <Wrapper>
      <ContentContainer>
        <label htmlFor="register">
          Register
          <input
            type="radio"
            id="register"
            checked={mode === 'register'}
            onChange={() => setMode('register')}
          />
        </label>

        <label htmlFor="login">
          Login
          <input
            type="radio"
            id="login"
            checked={mode === 'login'}
            onChange={() => setMode('login')}
          />
        </label>

        <form onSubmit={onFormSubmit}>
          <label htmlFor="username">
            Username
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <p>{errorMessage && errorMessage}</p>

          <button type="submit">Log in</button>
        </form>
      </ContentContainer>
    </Wrapper>
  );
};

export default Login;
