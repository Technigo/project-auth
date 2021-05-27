import React from "react";
import styled from "styled-components";

const SubmitButton = styled.button`
  padding: 15px 0;
  width: 100%;
  border-radius: 40px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #f780b1;
  outline: none;
  cursor: pointer;
  background-color: #f780b1;
  color: #ffffff;
  font-family: "Padauk", sans-serif;
  letter-spacing: 1.5px;
  margin-top: 20px;
  :hover,
  :focus {
    color: #f780b1;
    background-color: #f2f3ff;
  }
  @media (min-width: 768px) {
    margin-bottom: 17px;
  };
  @media (min-width: 1200px) {
    margin-bottom: 14px;
  }
`;

const ButtonJoke = styled(SubmitButton)`
  padding: 5px 0;
  width: 50%;
  background-color: rgba(229, 109, 107, 1);
  border: 2px solid rgba(229, 109, 107, 1);
  position: absolute;
  height: fit-content;
  bottom: 10px;
  :hover {
    color: #fff;
    background-color: rgba(229, 109, 107, 0.5);
    border: 2px solid rgba(255,255,255,0.5);
  }
`;

export const Button = ({ buttonText, onClick }) => {
  return <SubmitButton type="submit" onClick = {onClick}>{buttonText}</SubmitButton>;
};

export const JokeButton = ({ buttonText, onClick }) => {
  return <ButtonJoke type="submit" onClick = {onClick}>{buttonText}</ButtonJoke>;
};

