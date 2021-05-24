import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
`;

const Label = styled.label``;

const Input = styled.input`
  outline: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid grey;
  width: 100%;
  padding-bottom: 5px;
  margin-bottom: 25px;
  :focus {
    border-bottom: 2px solid pink;
  }
`;

export const InputForm = ({ id, placeholder }) => {
  return (
    <>
      <Label for={id} aria-label={`Enter your ${id}`}></Label>
      <Input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
      ></Input>
    </>
  );
};
