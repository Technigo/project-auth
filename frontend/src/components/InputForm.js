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
  border-bottom: 2px solid #d8d8d8;
  width: 100%;
  padding-bottom: 5px;
  margin-bottom: 30px;
  font-size: 16px;
  font-family: "Padauk";
  background-color: #f2f3ff;
  color: #fff;
  :focus {
    border-bottom: 2px solid #f780b1;
  }
`;

export const InputForm = ({ id, placeholder }) => {
  return (
    <>
      <Label htmlFor={id} aria-label={`Enter your ${id}`}></Label>
      <Input type="text" id={id} name={id} placeholder={placeholder}></Input>
    </>
  );
};
