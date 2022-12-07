import React from "react";
import { Form, ButtonLink } from "./Register";
import { FormSection } from "./GlobalStyles";

export const LogIn = () => {
    return (
        <FormSection>
        <h1>Log in</h1>
            <Form>
                <input type="text" placeholder="username"></input>
                <input type="text" placeholder="password"></input>
            </Form>
            <p>Not a registered user?</p>
        <ButtonLink to="/">Sign up</ButtonLink>
      </FormSection>
    )
}