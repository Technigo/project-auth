import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RegistrationForm = () => {
  return (
    <>
      <Link to={`/login`} className='Link'>
        Go to the Login page
      </Link>
      <Form>
        <label>
          <h2>Register a new account</h2>
        </label>
        <Input type='text' placeholder='Username'></Input>
        <Input type='password' placeholder='Password'></Input>
        <Button>Register</Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background-color: #92dea0;
  padding: 5px;
  margin: 15px;
  border: none;
  border-bottom: 2px solid black;
  width: 300px;
  text-transform: uppercase; 

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: black;s
    opacity: 1; /* Firefox */
    font-family: var(--font);
  }
`;

const Button = styled.button`
  background-color: #92dea0;
  align-self: center;
  width: fit-content;
  padding: 5px 15px;
  margin: 10px;
  font-size: 1em;
  padding: 5px;
  border: 2px solid black;
  text-transform: uppercase;

  :hover {
    background-color: #1e9086;
    transform: rotate(360deg);
    transition: 0.5s ease;
  }

  /* Small laptop */
  @media (min-width: 992px) {
  }
`;
