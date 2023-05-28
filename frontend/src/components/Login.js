import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import user from 'reducers/user';
import { API_URL } from 'utils/urls';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState(null);
  const [mode, setMode] = useState('LOGIN');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // this is a hook that we can use to change the url

  const accessToken = useSelector((store) => store.user.accessToken);
  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    };
    fetch(API_URL(mode.toLowerCase()), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setAccessToken(data.response.accessToken));
          dispatch(user.actions.setUserId(data.response.userId));
          dispatch(user.actions.setError(null));
        } else {
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setError(data.response.message));
        }
      });
  };

  return (
    <section className="login-section">
      <div className="checkbox-container">
        <label htmlFor="register" className="">
          Register
          <input
            type="radio"
            id="register"
            checked={mode === 'REGISTER'}
            onChange={() => setMode('REGISTER')}
          />
        </label>
        <label htmlFor="login">
          Login
          <input
            type="radio"
            id="login"
            checked={mode === 'LOGIN'}
            onChange={() => setMode('LOGIN')}
          />
        </label>
      </div>
      <div className="input-container">
        <h1>Login</h1>
        <form>
          <div className="username-input-container">
            <label>
              Enter your username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="password-input-container">
            <label>
              Enter your password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button
            class="form-submit-button"
            type="submit"
            onClick={onFormSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
