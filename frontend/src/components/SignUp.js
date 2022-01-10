import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //   const fetchUser = () => {
  //     fetch('https://user-signup-sofia-aleksa.herokuapp.com/signup')
  //       .then(res => res.json())
  //       .then(data => setUsername(data));
  //   };

  const onFormSubmit = event => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    fetch('https://user-signup-sofia-aleksa.herokuapp.com/signup', options)
      .then(res => res.json())
      .then(data => setUsername(data));
  };

  return (
    <div>
      <h1>sign up</h1>
      <form onSubmit={onFormSubmit}>
        <label>username</label>
        <input
          type='text'
          placeholder='enter username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label>password</label>
        <input
          type='password'
          placeholder='enter password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>register</button>
      </form>
      <p>already a member?</p>
      <Link to='/'>Sign in</Link>
    </div>
  );
};

export default SignUp;
