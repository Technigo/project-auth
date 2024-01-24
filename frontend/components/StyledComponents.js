import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

export const Header = styled.h1`
  color: #489FB5;
`;

export const Paragraph = styled.p`
  color: #489FB5;
`;

export const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  background-color: #82C0CC;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #16697A;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledButton = styled.button`
  background-color: #82C0CC;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #16697A;
  }
`;

export const Success = styled.p`
color: green;
font-weight: bold;
margin-top: 10px;
`;

export const Error = styled.p`
  color: red;
  text-align: center;
`;
