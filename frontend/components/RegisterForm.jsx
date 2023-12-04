import React, { useState } from 'react';
import { Container, Header, Input, Button, Paragraph, Error } from './StyledComponents';

const API_REGISTER_URL = 'http://localhost:8080/api/users/register';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      if (!response.ok) throw new Error('Registration failed');

      const data = await response.json();
      console.log('Registration successful:', data);
      // Optionally handle redirection or state update here
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <Container>
      <Header>Register</Header>
      <form onSubmit={handleRegister}>
      <Paragraph>Username:</Paragraph>
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <Paragraph>E-mail:</Paragraph>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <Paragraph>Password of choice:</Paragraph>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <Button type="submit">Register</Button>
        {error && <Error>{error}</Error>}
      </form>
    </Container>
  );
}

export default RegisterForm;
