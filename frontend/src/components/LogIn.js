import React from 'react';
import { Buttons } from '../GlobalStyles'
import { InnerWrapper } from '../GlobalStyles';
import { OuterWrapper } from '../GlobalStyles';
import { Batman } from '../GlobalStyles';
import { Headline, TextInput, Form, Label } from '../GlobalStyles';

export const LogIn = () => {
  return (
    <OuterWrapper>
    <InnerWrapper>
        <Batman />
        <Headline><span>Log in</span></Headline>
          <Form>
            <Label htmlFor="username">Username:</Label>
            <TextInput type="text" id="username" name="username" placeholder="username" />
            <Label htmlFor="password">Password:</Label>
            <TextInput type="password" id="password" name="password" placeholder="password" />
            <Buttons type="submit" value="Create account">Log in</Buttons>
          </Form> 
      </InnerWrapper>
    </OuterWrapper>
  );
}