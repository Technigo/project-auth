import React from 'react';
import { Link } from 'react-router-dom';
import { Title, Wrapper, Form, Input, Button, LinkWrapper } from 'styles/Styles';
import { useDispatch, batch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SIGNIN_URL } from '../utils/urls';

import user from '../reducers/user';

import styled from 'styled-components';

const Login = () => {
return (
<Wrapper>
    <Form>
    <Title>sign in</Title>
        <Input
        type="text"
        placeholder="Name"
        />
        <Input
        type="password"
        placeholder="Password"
        />
        <Button> sign in
        <Link to='/main'></Link> 
        </Button>
        <LinkWrapper>
        <p>Not a member?</p>
        <Link to='/register'>Register here!</Link>
        </LinkWrapper>
    </Form>
</Wrapper>
)
}


export default Login;