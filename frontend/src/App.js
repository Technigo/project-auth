import React from "react";
import styled from "styled-components/macro";

import { Form } from "./Components/Form";
import { LogIn } from "./Components/LogIn";

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const App = () => {
  const username = true;
  const USER_URL = "http://localhost:8080/users";

  //const createUser = () => {
  //   fetch(USER_URL, {
  //     method: "POST",
  //     body: JSON.stringify({ username, email, password }),
  //     headers: { "Content-type": "application/json" },
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json;
  //       }
  //       throw "Couldn't create user"; //display errormessage from backend here
  //     })
  //     .then(json => {
  //       //Use redux here for setting the accesstoken from res, so something with json.accessToken
  //     });
  //};

  return (
    <>
      {username === false ? (
        <Wrapper>
          <h1>Sign up or log in here!</h1>
          <InnerWrapper>
            <Form
              input="Log in"
              heading="Log in here:"
              labelHeading="Select a username:"
              labelText="Enter a password:"
            />
            <Form
              input="Sign up"
              heading="Sign up here:"
              labelHeading="Enter username:"
              labelText="Enter password:"
            />
          </InnerWrapper>
        </Wrapper>
      ) : (
        <LogIn username="Holabandola" />
      )}
    </>
  );
};
