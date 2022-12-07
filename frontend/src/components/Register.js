import { Link } from 'react-router-dom';
import { Title, Wrapper, Form, Input, Button, LinkWrapper } from 'styles/Styles';

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { REGISTER_URL } from 'utils/urls';
import user from "reducers/user";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const accessToken = useSelector((store) => store.user.accessToken);
const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

const onFormSubmit = event => {
event.preventDefault();

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

fetch(REGISTER_URL, options)
      .then(res => res.json())
      .then((data)=> {
        if (data.success) {
         batch(()=>{
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
         })
        } else {
            batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));    
            })
            setError("Sorry, this is an invalid username or password");
        }
      })
}
return (
<Wrapper>
    <Form onSubmit={onFormSubmit}>
    <Title>Sign up</Title>
        <Input
        type="text"
        placeholder="Name"
        value={username}
        onChange={e => setUsername(e.target.value)}
        />
        <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        />
        {password && password.length < 8
          ? 'password must be over 8 characters'
          : ''}

        <Button 
        type="submit">
        Register
        </Button>
        {/* {error !== null && (
          <p style={{ fontSize: '21px', color: 'red' }}>{error}</p>
        )} */}
        <LinkWrapper>
        <p>Already a member?</p>
        <Link to='/login'>Sign in</Link>
        </LinkWrapper>
    </Form>
</Wrapper>
)
}

export default Register;