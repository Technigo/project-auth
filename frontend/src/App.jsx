import { useState } from 'react';
import styled from 'styled-components';

const API_URL = 'https://project-auth-backend.onrender.com';

const Container = styled.div`

  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  align-items: center;
  justify-content: center;
  max-width: 50%;
  margin: 0 auto;
  column-gap: 10px;
`;


const App = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [token, setToken] = useState('');

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSignup = async () => {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    setToken(data.accessToken);
  };

  const handleLogin = async () => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, password: user.password }),
    });
    const data = await response.json();
    setToken(data.accessToken);
  };

  const handleLogout = async () => {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: { Authorization: token },
    });
    setToken('');
    setSecrets(null);
  }

  const [newSecret, setNewSecret] = useState('');

  const handlePostSecret = async () => {
    await fetch(`${API_URL}/secrets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ message: newSecret }),
    });
    setNewSecret('');
    handleFetchSecrets();
  };

  const [secrets, setSecrets] = useState(null); 

  const handleFetchSecrets = async () => {
    const response = await fetch(`${API_URL}/secrets`, {
      headers: { Authorization: token },
    });
    const data = await response.json();
    // console.log(data);
    setSecrets(data);
    
  };

  return (
    <Container>
      <h1>Simple Authentication App</h1>
      <input name="name" value={user.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={user.email} onChange={handleChange} placeholder="Email" />
      <input name="password" value={user.password} onChange={handleChange} placeholder="Password" type="password" />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleLogout}>Log Out</button>
      
      {token && <input value={newSecret} onChange={(event) => setNewSecret(event.target.value)} placeholder="Enter your secret here" />}
      {token && <button onClick={handlePostSecret}>Post Secret</button>}

      {token && <button onClick={handleFetchSecrets}>Fetch Secrets</button>}
      {secrets && secrets.map((secret, index) => (
  <div key={index}>
    {secret.message}
  </div>
))}
    
    </Container>
  );
};


export default App;