import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "./reducers/user";
import { Button, FormSection } from "./LogIn";
import styled from "styled-components";
import loginImg from "../images/Success.png"

export const Home = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect( () => {
      if (!accessToken) {
          navigate("/login");
      }
  }, []);

    
    return (
    <FormSection>
      
        <WelcomeHeader>Welcome, you are now logged in!</WelcomeHeader>
        <Pic src={loginImg} alt="Success" />
      <Button
        type="button"
        onClick={() => {
          dispatch(user.actions.setAccessToken(null));
          navigate("/login");
        } }>
          Log Out
        </Button>
        </FormSection>
    )
}

export const WelcomeHeader = styled.h1`    
font-size: 20px;
margin: 10px;

@media (min-width: 800px) {
font-size: 25px;
}`

export const Pic = styled.img`
  width: 40%;
  height: auto;
  margin: 5px;

`