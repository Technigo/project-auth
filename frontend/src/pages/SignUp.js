import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Loading } from "../components/Loading";
import { Button } from "components/Buttons";
import { InputForm } from "components/InputForm";
import { Footer } from "components/Footer";
import pic2 from "assets/pic2.jpg";
import user from "../reducers/user";
import { API_URL } from "../reusables/urls";
import { 
  SignInUpContainer, 
  FormContainer, 
  SignInUpForm, 
  CreateAccount, 
  ErrorMessageSignUp, 
  EyeButtonSignUp, 
  FormImageContainer, 
  FormImage } from '../components/StylingPages';

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
              console.log(data)
              handleErrors(data);
            }
            setPassword("");
            setLoading(false);
          })
          .catch(),
      1500
    );
  };

  const handleErrors = (error) => {
    const errorType = error.error.errors;
    if (error.error.code === 11000) {
      if (error.error.keyValue.username) {
        setErrorMessage(error.error.message)
      } else if (error.error.keyValue.email) {
        setErrorMessage(error.error.message)
      }
      setErrorMessage(error.message)
    } else if (errorType.username) {
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
        <SignInUpContainer>
          <FormImageContainer>
            <FormImage src={pic2}></FormImage>
          </FormImageContainer>
          <FormContainer>
            <CreateAccount>Create New Account</CreateAccount>
            <SignInUpForm onSubmit={handleFormSubmit}>
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
              <EyeButtonSignUp type="button" onClick={togglePassword}>
                {showPassword ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </EyeButtonSignUp>
              <ErrorMessageSignUp>{errorMessage}</ErrorMessageSignUp>
              <Button onClick={() => setMode("signup")} buttonText="register" />
            </SignInUpForm>
          </FormContainer>
        </SignInUpContainer>
      )}
      <Footer
        footerText="Already have an account?"
        linkText="Sign In"
        linkTo="/"
      />
    </>
  );
};
