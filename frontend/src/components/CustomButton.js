import React from 'react'
import Button from '@material-ui/core/Button';

export const CustomButton = ({ button, onClick, disabled, value, text, color, variant, size }) => {
  return (
    <Button
      variant={variant} 
      color={color}
      size={size}
      type={button}
      onClick={onClick}
      disabled={disabled}
      value={value}
    >
      {text}
    </Button>
  )
}


// import React from 'react'
// import styled from "styled-components/macro"

// export const CustomButton = styled.button`
//   width: 35%;
//   font-size: 1em;
//   color: #fff;
//   border-radius: 3px;
//   background: transparent; 
//   text-transform: uppercase;
//   align-items: center;
//   padding: 4px 8px;
//     ${({ signBtn }) => signBtn && `
//     color: red;
//     &:hover {
//     color: #fff;
//   `}
// `

// export const Button = ({ button, onClick, disabled, value, text }) => {
//   return (
//     <CustomButton
//       type={button}
//       onClick={onClick}
//       disabled={disabled}
//       value={value}
//     >
//       {text}
//     </CustomButton>
//   )
// }
