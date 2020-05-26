import React, { useState } from 'react';

const URL = 'https://project-authorize.herokuapp.com/';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'content-Type': 'application/json' },
    })
      //.then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          setShowSummary(true);
          return res.json();
        } else {
          throw new Error('Unable to sign up');
        }
      })

      // .then((json) => console.log(json))
      // .catch((err) => status(403).json('error:', err));
      // will show this error message if name or password is not unique
      .catch((err) => {
        setErrorMessage('error: Username/email is already registered.', err);
      });
  };

  return (
    <div>
      {!showSummary && (
        <form onSubmit={handleSubmit}>
          <label>
            username
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            email
            <input
              type='email'
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            password
            <input
              required
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button type='submit' onClick={handleSubmit}>
            SIGN UP
          </button>
        </form>
      )}
      {showSummary && <p>You are now signed up {name}</p>}
      {errorMessage && <h1>{errorMessage}</h1>}
    </div>
  );
};
