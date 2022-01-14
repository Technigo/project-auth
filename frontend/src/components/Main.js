import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import user from "../reducers/user";

const Main = () => {
  const quotesItems = useSelector((store) => store.quotes.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function for logout
  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));

      localStorage.removeItem("user");
    });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <Wrapper>
      <Container>
        <Logintitle>Secret Quotes</Logintitle>
        {quotesItems.map((item) => (
          <Quotes key={item._id}>{item.message}</Quotes>
        ))}
        <Button onClick={logout}>Logout</Button>
      </Container>
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10%;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 10px;
  padding: 15px 10px;
  border-radius: 10px;
  /* background-color: #984ba4; */
  border-radius: 10px;
  border: 2px solid #984ba4;

  @media (min-width: 768px) {
    width: 50%;
    padding: 30px 25px;
  }

  @media (min-width: 1025px) {
    width: 20%;
    padding: 30px 25px;
  }
`;

const Logintitle = styled.h1`
  text-align: center;
  font-size: 30px;
  margin: 0px;
  padding: 20px 0;
  @media (min-width: 768px) {
    font-size: 45px;
  }
  @media (min-width: 1025px) {
    font-size: 30px;
  }
`;

const Quotes = styled.div`
  font-size: 18px;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 25px;
  }
  @media (min-width: 1025px) {
    font-size: 18px;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: #984ba4;
  color: ;
  box-shadow: 0px 8px 15px rgba(100, 80, 18, 0.6);
  transition: all 0.3s ease 0s;
  cursor: pointer;
`;
