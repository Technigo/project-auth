/* eslint-disable react/prop-types */
//imports
import styled from "styled-components";
import { useState } from "react";

//styling
const FormSection = styled.section`
  display: flex;
  background: red;

  @media all and (min-width: 744px) {
  }
  @media all and (min-width: 1024px) {
  }
`;

//component
export const Form = ({ onSubmit, buttonText }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, password });
  };

  return (
    <FormSection>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{buttonText}</button>
      </form>
    </FormSection>
  );
};
