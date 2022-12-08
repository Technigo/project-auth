import React, { useState } from 'react'
import { Form, ButtonLink, Input, PageHeader, Button, Text } from "./Register";
import { FormSection } from "./GlobalStyles";

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
                 placeholder="Username" />
                <Input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Password" />
            </Form>
            <Button type="submit">Log in</Button>
            <Text>Not a registered user?</Text>
        <ButtonLink to="/">Sign up</ButtonLink>
      </FormSection>
    )
}