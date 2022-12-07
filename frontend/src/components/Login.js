import React from 'react';
import { Link } from 'react-router-dom';
import { Title, Wrapper, Form, Input, Button } from 'styles/Styles';

const Login = () => {
return (
<Wrapper>
    <Form>
    <Title>Login here!</Title>
        <Input
        type="text"
        placeholder="Name"
        />
        <Input
        type="text"
        placeholder="Password"
        />
        <Button> Click!
        <Link to='/main'></Link> 
        </Button>
    </Form>
</Wrapper>
)
}


export default Login;