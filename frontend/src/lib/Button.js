import styled from 'styled-components/macro'

export const Button = styled.button`
  margin: 8px 0;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1.12px;
  background: ${(props) => props.background || '#4d4d4d'};
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color: white;

  &:hover {
    background: #3d99f5;
    color: #fff;
    cursor: pointer;
    transition-duration: 0.3s;
  } 
`