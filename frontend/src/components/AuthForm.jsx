import styled from "styled-components";

// Reusable styled components for forms
export const FormContainer = styled.div`
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
`;

export const Input = styled.input`
  font-size: 1em;
  padding: 0.75em;
  margin: 0.25em;
  width: 325px;
  border: 1.5px solid #ffffff;
  border-radius: 0.5em;
  background-color: rgba(255, 255, 255, 0.13);
`;

export const AuthForm = ({ onSubmit, children }) => {
  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>{children}</Form>
    </FormContainer>
  );
};
