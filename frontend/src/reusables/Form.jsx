/* eslint-disable react/prop-types */
//imports
import styled from "styled-components";
import { Button } from "./Button";
import { useState } from "react";

//styling
const FormSection = styled.section`
  display: flex;
  justify-content: center;
  @media all and (min-width: 744px) {
  }
  @media all and (min-width: 1024px) {
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;

  @media all and (min-width: 744px) {
  }
  @media all and (min-width: 1024px) {
  }
`;

const StyledInput = styled.input`
  width: 280px;
  background: var(--grey);
  border: none;
  border-radius: 30px;
  padding: 10px 50px;
  height: 50px;
  margin: 20px;
  font-size: 1.1em;

  @media all and (min-width: 744px) {
    width: 450px;
  }
`;

//component
export const Form = ({ title, handleSubmit }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(name, password);
  };

  return (
    <FormSection>
      <h2>{title}</h2>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
          required
        />
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit">{title}</Button>
      </StyledForm>
    </FormSection>
  );
};
