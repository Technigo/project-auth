import React from 'react';

export const Button = ({ button, onClick, disabled, className, value, text }) => {
  return (
    <button
    type={button}
    onClick={onClick}
    disabled={disabled}
    className={className}
    value={value}
    >
      {text}
    </button>
  )
}
