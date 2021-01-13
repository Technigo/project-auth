import React from 'react';

import { StyledButton } from '../styling/GlobalStyles';

export const Button = props => {

  return (
    <StyledButton
      type="submit"
      onClick={() => { props.function(props.value) }}
      disabled={props.disabled}
    >
      {props.title}
    </StyledButton>
  );
};
