import React, { useState } from 'react'
import { Form, ButtonLink, Input, PageHeader, Button, Text } from "./Register";
import { FormSection } from "./GlobalStyles";
// import { useSelector, useDispatch } from 'react-redux';
//import user from './reducers/user';

export const LogIn = () => {
    const [ username, setUsername] = useState("")
    const [ password, setPassword ] = useState("")


    return (
        <FormSection>
        <PageHeader>Log in</PageHeader>
            <Form>
                <Input
                 type="text"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 placeholder="Username"
                 minLength="2"
                 maxLength="20" />
                <Input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Password"
                 minLength="5" />
            </Form>
            <Button type="submit">Log in</Button>
            <Text>Not a registered user?</Text>
        <ButtonLink to="/">Sign up</ButtonLink>
      </FormSection>
    )
}