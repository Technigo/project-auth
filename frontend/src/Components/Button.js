import React from "react";

import { FormButton } from '../styles/Styles'

export const Button = ({ input, onClickFunction }) => {
  return (
    <FormButton type="submit" onClick={onClickFunction}>
      {input}
    </FormButton>
  );
};
