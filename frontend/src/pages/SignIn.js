import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory } from "react-router-dom";

import user from "../reducers/user";
import { API_URL } from "../reusables/urls";
import { Loading } from "../components/Loading";
import { Button } from "components/Buttons";
import { InputForm } from "components/InputForm";
import { Footer } from "components/Footer";
import logo from "assets/logonew.png";
import pic from "assets/pic.jpg";
import {
  SignInUpContainer,
  FormContainer,
  SignInLogo,
  SignInUpForm,
  ErrorMessage,
  EyeButton,
  FormImageContainer,
  FormImage,
} from "../components/StylingPages";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
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
      body: JSON.stringify({ username, password }),
    };
    setTimeout(
      () =>
        fetch(API_URL(mode), options)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              batch(() => {
                dispatch(user.actions.setUsername(data.username));
                dispatch(user.actions.setAccessToken(data.accessToken));
                dispatch(user.actions.setErrors(null));
              });
            } else {
              setErrorMessage(data.message);
            }
            setLoading(false);
          })
          .catch(),
      1500
    );
  };

  const togglePassword = () => {
    if (!showPassword) setShowPassword(true);
    else setShowPassword(false);
  };

  return (
    <>
      {loading && <Loading loadingText="On your way to the jokes..." />}
      {!loading && (
        <SignInUpContainer>
          <FormContainer>
            <SignInLogo src={logo}></SignInLogo>
            <SignInUpForm onSubmit={handleFormSubmit}>
              <InputForm
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                placeholder="Username"
                value={username}
                type="text"
              ></InputForm>
              <InputForm
                type={showPassword ? "password" : "text"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></InputForm>
              <EyeButton type="button" onClick={togglePassword}>
                {showPassword ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </EyeButton>
              <ErrorMessage>{errorMessage}</ErrorMessage>
              <Button onClick={() => setMode("signin")} buttonText="sign in" />
            </SignInUpForm>
          </FormContainer>
          <FormImageContainer>
            <FormImage src={pic}></FormImage>
          </FormImageContainer>
        </SignInUpContainer>
      )}
      <Footer
        footerText="Don't have an account?"
        linkText="Sign Up"
        linkTo="/signup"
      />
    </>
  );
};
