import React, { useState } from 'react';

const URL = 'http://localhost:8080/users';

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log('error:', err));
  };

  return (
    <div>
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
    </div>
  );
};
