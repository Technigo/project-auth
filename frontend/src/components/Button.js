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
`;

const ButtonJoke = styled(SubmitButton)`
  padding: 5px 0;
  width: 50%;
  background-color: #e56d6b;
  border: 2px solid #e56d6b;
  position: absolute;
  height: fit-content;
  bottom: 10px;
`

export const Button = ({ buttonText }) => {
  return <SubmitButton type="button">{buttonText}</SubmitButton>;
};

export const JokeButton = ({ buttonText, onClick }) => {
  return <ButtonJoke type="button" onClick = {onClick}>{buttonText}</ButtonJoke>;
};
