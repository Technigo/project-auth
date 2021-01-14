import React from "react";
import styled from "styled-components";

const FormButton = styled.button`
  font-size: 18px;
  margin: 10px;
`;

export const Button = ({ input, onClickFunction }) => {
  return (
    <FormButton type="submit" onClick={onClickFunction}>
      {input}
    </FormButton>
  );
};
