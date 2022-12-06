import React from "react";
import { FormSection, Form } from "./Register";
import { Button } from "./Buttons";

const LogIn = () => {
    return (
      <FormSection>
        <h1>Log in</h1>
        <Form>
          <input type="text" placeholder="username"></input>
          <input type="text" placeholder="password"></input>
        </Form>
        <Button>Log in</Button>
      </FormSection>
    )
}

export default LogIn