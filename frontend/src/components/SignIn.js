import React from 'react';
import { Card, Input } from 'components/GlobalStyles';
import { Form, Button } from 'components/GlobalStyles';

export const SignIn = () => {
  return (
      <Card>
         <h1>Sign in</h1>
         <Form>
            <Input 
            type="text"
            placeholder="username"
            required
            /> 
            <Input 
            type="text"
            placeholder="password"
            required
            /> 
         </Form>
         <Button type="button" >sign in</Button>
      </Card>
  );
}
