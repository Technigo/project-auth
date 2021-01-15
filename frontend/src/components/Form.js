import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { LogIn } from './LogIn';
import { SignUp } from './SignUp';
import { Button } from './Button';
import { Secret } from './Secret';
import styled from 'styled-components/macro';

import { MainContainer } from 'styling/GlobalStyles';

export const Form = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const [section, setSection] = useState("LogIn")
  const error = useSelector((store) => store.user.statusMessage);

  // If accessToken exist
  if (accessToken) {
    return <Secret />
  };

  // If user is logged out, show the signup / login form
  return (
    <MainContainer>
      {section === "LogIn" && (
        <>
          <LogIn />
          <AccountWrapper>
            <AccountText>Not having an account yet?</AccountText>
            <Button title="Sign up here" function={setSection} value="SignUp"></Button>
          </AccountWrapper>
        </>
      )}

      {section === "SignUp" && (
        <>
          <SignUp />
          <AccountWrapper>
            {error && <h4>{`${error}`}</h4>}
            <AccountText>Already a user?</AccountText>
            <Button title="Log in" function={setSection} value="LogIn">Go to Login</Button>
          </AccountWrapper>
        </>
      )}
    </MainContainer>
  );
};

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AccountText = styled.p`
  font-size: 12px;
  padding: 4px;
`;