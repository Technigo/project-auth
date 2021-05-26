import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import user from "../reducers/user";

import { API_URL } from "../reusables/urls";

import { Button } from "components/Button";
import { InputForm } from "components/InputForm";
import { Footer } from "components/Footer";
import logo from "assets/logo.png";
import pic from "assets/pic.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 50%;
  width: 100%;
  margin-bottom: 100px;
  @media (min-width: 768px) {
    flex-direction: row;
    height: 60%;
    max-width: 75%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  @media (min-width: 1200px) {
    width: 60%;
    height: 70%;
  }
`;

const FormContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
  align-items: center;
  @media (min-width: 768px) {
    height: 100%;
  }
`;

const ImageContainer = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Logo = styled.img`
  background-image: url(./assets/logo.png);
  width: 50%;
  margin-bottom: 100px;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
  @media (min-width: 1200px) {
    width: 40%;
  }
`;

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(null);

  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // redirect user to '/' path
    console.log("Checking access token", accessToken);
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setErrors(null));
          });
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch();
  };

  return (
    <>
      <Container>
        <FormContainer>
          <Logo src={logo}></Logo>
          <Form onSubmit={onFormSubmit}>
            <InputForm
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              placeholder="Username"
              value={username}
              type="text"
            ></InputForm>
            <InputForm type="password" id="password" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)}></InputForm>
            <Button 
            onClick={() => setMode('signin')} 
            buttonText="sign in" />
          </Form>
        </FormContainer>
        <ImageContainer>
          <Image src={pic}></Image>
        </ImageContainer>
      </Container>
      <Footer
        footerText="Don't have an account?"
        linkText="Sign Up"
        linkTo="/signup"
      />
    </>
  );
};
