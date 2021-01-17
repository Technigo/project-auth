import React from "react";
import styled from "styled-components/macro";

const StyledInput = styled.input`
  width: 200px;
  font-size: 16px;
  margin-top: 10px;
  padding-left: 10px;
  height: 32px;
  font-family: Arial, Helvetica, sans-serif;
  background: #f1f1f1;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 4px;
  &::placeholder {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
  }
`;

export const CustomInput = ({
  placeholder,
  onChange,
  value,
  type = "text",
}) => (
  <StyledInput
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
);
