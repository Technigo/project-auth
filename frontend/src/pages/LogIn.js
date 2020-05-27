import React, { useState } from 'react';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { user, login } from '../reducers/user';
import { Headline } from '../lib/headline';
import { Button } from '../lib/button';
import { Form, InfoDiv, Input, Register } from '../lib/form'
import { useHistory, Link } from 'react-router-dom'

export const LogIn = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // To log in a user.
  const handleLogin = (event) => {
    event.preventDefault();
    //dispatch thunk
    dispatch(login(name, password))
  };

  if (!accessToken) {
    // If user is logged out, show login form
    return (
      <div>
        <Form onSubmit={(event) => handleLogin(event)}>
          <Headline title="Log in" />
          <InfoDiv>
            <Input
              placeholder="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" title="Log in" />
            <Register>Not a member?<Link to="/">Sign up</Link></Register>
          </InfoDiv>
        </Form>
      </div>
    );
  } else {
    // If user is logged in, show profile
    return <Profile />;
  }
};
export default LogIn;