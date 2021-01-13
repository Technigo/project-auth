import React from 'react';

export const Button = props => {

  return (
    <button
      type="submit"
      onClick={() => { props.function(props.value) }}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
};