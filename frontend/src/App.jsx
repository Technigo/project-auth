import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState('');

  // Function to handle login
  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('API_LOGIN_ENDPOINT', { username, password });
      setToken(response.data.accessToken);
      localStorage.setItem('token', response.data.accessToken);
      setUser({ username });
      setError('');
    } catch (err) {
      setError('Login failed');
    }
  };

  // Function to handle registration
  const handleRegister = async (username, email, password) => {
    try {
      await axios.post('API_REGISTER_ENDPOINT', { username, email, password });
      handleLogin(username, password);
      setError('');
    } catch (err) {
      setError('Registration failed');
    }
  };

  // Function to handle sign out
  const handleSignOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  // Function to get authenticated content
  const getAuthenticatedContent = async () => {
    try {
      const response = await axios.get('API_CONTENT_ENDPOINT', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data); // Handle your authenticated content
    } catch (err) {
      setError('Failed to fetch content');
    }
  };

  if (!token) {
    // User is not logged in
    return (
      <div>
        <LoginForm onLogin={handleLogin} />
        <RegisterForm onRegister={handleRegister} />
        {error && <p>{error}</p>}
      </div>
    );
  }

  // User is logged in
  return (
    <div>
      <p>Welcome, {user.username}</p>
      <button onClick={handleSignOut}>Sign Out</button>
      <button onClick={getAuthenticatedContent}>Get Content</button>
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(username, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}


export default App;
