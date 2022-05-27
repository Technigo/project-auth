import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_CONTENT, API_URL } from "utils/utils";
import styled from "styled-components";

import user from "reducers/user";
import content from "reducers/content";

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  // const contentItems = useSelector((store) => store.content.items)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(user.actions.setAccessToken(null));
    // localStorage.removeItem(accessToken)
    navigate("/signedout");
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login"); //change to "login" instead of "main" when styled
    }
  }, [accessToken]);

  useEffect(() => {
    const options = {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };

    fetch(API_CONTENT, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(content.actions.setItems(data.response));
          dispatch(content.actions.setError(null));
        } else {
          dispatch(content.actions.setError(data.response));
          dispatch(content.actions.setItems([]));
        }
      });
  }, []);

  return (
    <MainWrapper>
      <Wrapper>
        <SecretTitle>Remember to:</SecretTitle>
        <SecretText>Live</SecretText>
        <SecretText>Love</SecretText>
        <SecretText>Laugh</SecretText>
      </Wrapper>

      <BtnWrapper>
        <SignOutBtn onClick={signOut}>
          Great, thanks. Let me sign out
        </SignOutBtn>
      </BtnWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 90vw;
`;

const Wrapper = styled.div`
  min-width: 90vw;
  min-height: 80vh;
  margin-top: 40px;

  @media (min-width: 768px) {
    margin-top: 20px;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const SignOutBtn = styled.button`
  font-family: "League Spartan", sans-serif;
  color: gray;
  text-decoration: none;
  width: 25vw;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  
  

  @media (min-width: 768px) {
    margin-top: 20px;
    font-size: 18px;
  }
`;

const SecretText = styled.h1`
  font-family: "Shrikhand", cursive;
  color: green;
  text-shadow: 5px 5px blue;
  font-size: 85px;
  text-align: center;
  margin: 5px;

  @media (min-width: 768px) {
    font-size: 110px;
    margin: 0;
  }
`;
const SecretTitle = styled(SecretText)`
  color: lightskyblue;
  text-shadow: 5px 5px blue;
  font-size: 40px;

  @media (min-width: 768px) {
    font-size: 80px;
  }
`;

export default Main;
