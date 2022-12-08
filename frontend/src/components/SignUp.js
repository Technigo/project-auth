import React from 'react';
import { Buttons } from '../GlobalStyles'
import { InnerWrapper } from '../GlobalStyles';
import { OuterWrapper } from '../GlobalStyles';
import { Batman } from '../GlobalStyles';
import { Headline, TextInput, Form, Label } from '../GlobalStyles';

export const SignUp = () => {
  return (
    <OuterWrapper>
    <InnerWrapper>
        <Batman />
        <Headline><span>Sign up</span></Headline>
          <Form>
            <Label htmlFor="username">Username:</Label>
            <TextInput type="text" id="username" name="username" placeholder="username" />
            <Label htmlFor="password">Password:</Label>
            <TextInput type="password" id="password" name="password" placeholder="password" />
            <Buttons type="submit" value="Create account">Create account</Buttons>
          </Form> 
      </InnerWrapper>
    </OuterWrapper>
  );
}