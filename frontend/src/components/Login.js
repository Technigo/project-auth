import React from 'react';
import { Link } from 'react-router-dom';
import { Title, Wrapper, Form, Input, Button, LinkWrapper } from 'styles/Styles';

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
        type="text"
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