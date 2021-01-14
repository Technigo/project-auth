gitimport React from 'react';
import styled from 'styled-components';

const PurpleButton = styled.button`
  width: 200px;
  background: #DB71CB;
  height: 40px;
  width: 250px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  font-family: 'Montserrat';
  font-weight: bold;
  box-shadow: 2px 2px 5px grey;
  margin: 50px;

  &:active {
    transform: translateY(3px)
  }
`;

const Button = ({title}) => {
  return (
    <PurpleButton>
      {title}
    </PurpleButton>
  )
}

export default Button;