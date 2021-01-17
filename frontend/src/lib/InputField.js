import React from 'react';
import styled from 'styled-components';


const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: grey;
  margin-bottom: 10px;
  font-size: 18px;
`;
const Input = styled.input`
  width: 300px;
  height: 35px;
  border-radius: 5px;
  outline: grey;
  margin-bottom: 30px;
`;


const InputField = ({title, htmlFor, id, type, onChange, value}) => {
  return (
    <InputContainer>
      <Label htmlFor={htmlFor}>{title}</Label>
      <Input value={value} id={id} type={type} onChange={event => onChange(event.target.value)}></Input>
    </InputContainer>
  )
};

export default InputField;