import React, { useState, useEffect } from "react";
import { StyledButton, StyledDiv } from "GlobalStyles";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components/macro';


export const Welcome = () => {
  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');
  const [quoteOfTheDay, setQuoteOfTheDay] = useState({});

  const navigate = useNavigate();

  const clearStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    navigate("/");
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    }
  }

  useEffect(() => {
    fetch('https://project-auth-ca23vvjbjq-lz.a.run.app/welcome', options)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetch('https://dummyjson.com/quotes/random')
      .then((response) => response.json())
      .then((json) => setQuoteOfTheDay(json))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // If there is an accesstoken present, log user in and display welcome page, 
  // otherwise ask them to log in
  return (
    <>
      {accessToken && (
        <>
        <StyledDiv>
          <h2>Hello {username}! You are now logged in</h2>
          <StyledButton onClick={() => clearStorage()}>Log out</StyledButton>
        </StyledDiv>
        <QuoteDiv>
          <h2>Quote Of The Day</h2>
          <h2>{quoteOfTheDay?.quote}</h2>
          <h3>-{quoteOfTheDay?.author}</h3>
        </QuoteDiv>
        </>
      )}
      {!accessToken && (
        <StyledDiv>
          <h2>Please log in</h2>
          <StyledButton onClick={() => clearStorage()}>Go to start page</StyledButton>
        </StyledDiv>
      )}
    </>
  )
}

const QuoteDiv = styled(StyledDiv)`
  width: 70%;
  margin-top: 2rem;
`