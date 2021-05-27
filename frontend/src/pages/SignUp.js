import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Loading } from "../components/Loading";
import { Button } from "components/Button";
import { InputForm } from "components/InputForm";
import { Footer } from "components/Footer";
import pic2 from "assets/pic2.jpg";

import user from "../reducers/user";

import { API_URL } from "../reusables/urls";

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
  position: relative;
`;

const CreateAccount = styled.h1`
  font-weight: 500;
  font-size: 23px;
  color: #83868e;
  font-family: "Roboto";
  margin-bottom: 40px;
`;

const ErrorMessage = styled.p`
  color: red;
  padding-top: 10px;
  font-size: 12px;
  margin: 0;
  position: absolute;
  bottom: 25%;
  @media (min-width: 768px) {
    padding-top: 15px;
    bottom: 27%;
  }
`;

const EyeButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: #6c6c6d;
  position: absolute;
  right: 0;
  bottom: 36%;
  :hover {
    opacity: 0.8;
  }
`;

export const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, email, password }),
    };
    setTimeout(
      () =>
        fetch(API_URL(mode), options)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              batch(() => {
                dispatch(user.actions.setUsername(data.username));
                dispatch(user.actions.setName(data.name));
                dispatch(user.actions.setEmail(data.email));
                dispatch(user.actions.setAccessToken(data.accessToken));
                dispatch(user.actions.setErrors(null));
              });
            } else {
              handleErrors(data);
            }
            // setName("");
            // setUsername("");
            // setEmail("");
            setPassword("");
            setLoading(false);
          })
          .catch(),
      1500
    );
  };

  const handleErrors = (error) => {
    const errorType = error.error.errors;
    if (errorType.username) {
      setErrorMessage(errorType.username.message);
    } else if (errorType.name) {
      setErrorMessage(errorType.name.message);
    } else if (errorType.email) {
      setErrorMessage(errorType.email.message);
    } else {
      setErrorMessage(errorType);
    }
  };

  const togglePassword = () => {
    if (!showPassword) setShowPassword(true);
    else setShowPassword(false);
  };

  return (
    <>
      {loading && <Loading loadingText="Creating new account..." />}
      {!loading && (
        <Container>
          <ImageContainer>
            <Image src={pic2}></Image>
          </ImageContainer>
          <FormContainer>
            <CreateAccount>Create New Account</CreateAccount>
            <Form onSubmit={handleFormSubmit}>
              <InputForm
                value={name}
                id="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              ></InputForm>
              <InputForm
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                placeholder="Username"
                value={username}
                type="text"
              ></InputForm>
              <InputForm
                value={email}
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              ></InputForm>
              <InputForm
                type={showPassword ? "password" : "text"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
              ></InputForm>
              <EyeButton type="button" onClick={togglePassword}>
                {showPassword ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </EyeButton>
              <ErrorMessage>{errorMessage}</ErrorMessage>
              <Button onClick={() => setMode("signup")} buttonText="register" />
            </Form>
          </FormContainer>
        </Container>
      )}
      <Footer
        footerText="Already have an account?"
        linkText="Sign In"
        linkTo="/"
      />
    </>
  );
};
