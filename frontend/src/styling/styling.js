import styled from "styled-components";

// Style for heading
export const Heading = styled.h1`
  font-size: 36px;
`;

// Styling for form container
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
`;

//Style for form
export const UserForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border:1px solid black;
  padding: 50px;
`;

export const FormLabel = styled.label`
 margin: 20px;
 font-weight:bold;
`;

export const FormInput = styled.input`
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
  margin-left: 10px;
  width: 200px;
`;

// Style for buttons
export const Button = styled.button`
  padding: 10px;
  background: #000;
  color: #fff;
  font-size: 18px;
  font-weight:bold;
  text-align: center;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    transition: 200ms ease-in-out;
    letter-spacing: 1px;
    background: #A599E0;
    color: #000;
  }
`;