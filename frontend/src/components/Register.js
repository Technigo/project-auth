import React from 'react';
import { Link } from 'react-router-dom';
import { Title, Wrapper, Form, Input, Button, LinkWrapper } from 'styles/Styles';

import { REGISTER_URL } from 'utils/urls';

const Register = () => {
return (
<Wrapper>
    <Form>
    <Title>Sign up</Title>
        <Input
        type="text"
        placeholder="Name"
        />
        <Input
        type="text"
        placeholder="Password"
        />
        <Button> Register
        <Link to='/main'></Link> 
        </Button>
        <LinkWrapper>
        <p>Already a member?</p>
        <Link to='/login'>Sign in</Link>
        </LinkWrapper>
    </Form>
</Wrapper>
)
}

export default Register;