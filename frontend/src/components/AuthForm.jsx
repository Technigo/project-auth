import { useState } from "react"; // Import useState from react

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const FormContainer = styled.div`
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputField = styled.input`
  font-size: 1em;
  padding: 0.75em;
  padding-right: 2.5em;
  margin: 0.25em;
  width: 295px;
  border: 1.5px solid #ffffff;
  border-radius: 0.5em;
  background-color: rgba(255, 255, 255, 0.13);
`;

const EyeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  right: 0.75em;
  transform: translateY(-50%);
  cursor: pointer;
  color: #fffffff;
`;

export const Input = ({ type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <InputContainer>
      <InputField
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {type === "password" && (
        <EyeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onClick={toggleShowPassword}
        />
      )}
    </InputContainer>
  );
};

export const AuthForm = ({ onSubmit, children }) => {
  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>{children}</Form>
    </FormContainer>
  );
};
