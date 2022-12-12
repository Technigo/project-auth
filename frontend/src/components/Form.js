import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'reducers/user';

export const Form = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const errorMessage = useSelector((store) => store.user.error);

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(logIn(props.mode, username, password));
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="username">
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </label>

      <label htmlFor="password">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </label>

      <p>{errorMessage && errorMessage}</p>

      <button type="submit">Log in</button>
    </form>
  );
};
