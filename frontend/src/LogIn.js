import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user, login } from './reducers/user';
import { Profile } from 'Profile.js';

// const URL = 'http://localhost:8080/users';
// const URL = 'https://project-authorize.herokuapp.com/users';

export const LogIn = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const loggedoutMessage = useSelector(
    (store) => store.user.login.loggedoutMessage
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(name, password));
  };

  if (!accessToken) {
    return (
      <div>
        {!showSummary && (
          <form onSubmit={handleLogin}>
            <label>
              username
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
            <label>
              email
              <input
                type='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label>
              password
              <input
                type='password'
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            <button type='submit'>LOG IN</button>
          </form>
        )}
        {showSummary && <p>You are now signed up {name}</p>}
        {errorMessage && <h1>{errorMessage}</h1>}
      </div>
    );
  } else {
    return <Profile />;
  }
};
