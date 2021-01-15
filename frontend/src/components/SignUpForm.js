import React, { useState } from 'react';
import { signUp } from 'reducers/user';
import { useDispatch } from 'react-redux'

export const SignUpForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(signUp(name, email, password));
    setName('');
    setEmail('');
    setPassword('');
    console.log("in signup")
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          required
          type="text"
          value={name}
          placeholder="Type your name"
          onChange={event => setName(event.target.value)}
        ></input>
      </label>
      <label>
        <input
          required
          type="email"
          value={email}
          placeholder="email@email.com"
          onChange={event => setEmail(event.target.value)}
        ></input>
      </label>
      <label>
        <input
          required
          type="password"
          value={password}
          placeholder="password"
          onChange={event => setPassword(event.target.value)}
        ></input>
      </label>
      <button type="submit" >Signup</button>
    </form>
  );
};

