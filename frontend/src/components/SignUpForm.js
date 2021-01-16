import React, { useState } from 'react';
import { signUp } from 'reducers/user';
import { useDispatch } from 'react-redux';

import { Button } from './Button';
import '../styles/style.css';

export const SignUpForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Couldn't find a regex that validates all email formats
  const validatedEmail = '/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/';

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(signUp(name, email, password));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form className="content" onSubmit={handleSubmit}>
      <div className="form-text-input-fields">
        <label>
          <input
            className="text-input-field"
            required
            type="text"
            value={name}
            minLength={2}
            placeholder="Type your name"
            onChange={event => setName(event.target.value)}
          ></input>
        </label>
        <label>
          <input
            className="text-input-field"
            required
            // pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
            pattern={validatedEmail}
            type="email"
            value={email}
            placeholder="email@email.com"
            onChange={event => setEmail(event.target.value)}
          ></input>
        </label>
        <label>
          <input
            className="text-input-field"
            required
            type="password"
            value={password}
            minLength={5}
            placeholder="password"
            onChange={event => setPassword(event.target.value)}
          ></input>
        </label>
      </div>
      <div className="form-buttons">
        <Button
          className={
            !name || !email || password.length < 5
              ? 'form-button-disabled'
              : 'form-button'
          }
          type="submit"
          disabled={!name || !email || password.length < 5}
          text="Signup"
        />
      </div>
    </form>
  );
};
