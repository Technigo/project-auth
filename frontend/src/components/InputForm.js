import React from "react";
import styled from "styled-components";

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
  color: #6c6c6d;
  :last-of-type {
    margin-bottom: 0;
  }
  :focus {
    border-bottom: 2px solid #f780b1;
  }
`;

export const InputForm = ({ id, value, placeholder, onChange, type, minLength, required }) => {
  return (
    <>
      <Label htmlFor={id} aria-label={`Enter your ${id}`}></Label>
      <Input
        type={type}
        id={id}
        value={value}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
        minLength={minLength}
        // required
      ></Input>
    </>
  );
};
