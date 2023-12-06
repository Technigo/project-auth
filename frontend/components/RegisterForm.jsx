import React, { useState, useEffect } from 'react';
import { Container, Header, Input, Form, StyledButton, Paragraph, Success, Error } from './StyledComponents';

const API_REGISTER_URL = 'http://localhost:8080/api/users/register';//check endpoint!!!

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
  
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(API_REGISTER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });
  
        if (!response.ok) {
          if (response.status === 400) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Bad Request');
          } else {
            throw new Error('Registration failed');
          }
        }
  
        const data = await response.json();
        console.log('Registration successful:', data);

        // Set success message
        setSuccess(true);
  
        // Force clear input fields on successful registration
        setUsername('');
        setEmail('');
        setPassword('');
  
        // Optionally handle redirection or state update here
      } catch (err) {
        setError(err.message || 'Registration failed');
      }
    };

  return (
    <Container>
      <Header>Register</Header>
      <Form onSubmit={handleRegister} autoComplete="off">
        <Paragraph>Username:</Paragraph>
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <Paragraph>E-mail:</Paragraph>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <Paragraph>Password of choice:</Paragraph>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <StyledButton type="submit">Register</StyledButton>
        {error && <Error>{error}</Error>}
        {success && <Success>Registration successful! You can now log in. </Success>}
      </Form>
    </Container>
  );
}

export default RegisterForm;

