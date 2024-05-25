import { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredUsername, setRegisteredUsername] = useState('');
  const [loading, setLoading] = useState(false);

  // State to store error messages
  const [error, setError] = useState({
    username: '',
    email: '',
    password: '',
    form: ''
  });

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Inline validation logic
    if (name === 'username' && value.length < 3) {
      setError((prev) => ({ ...prev, username: 'Username must be at least 3 characters long' }));
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      setError((prev) => ({ ...prev, email: 'Email must be valid' }));
    } else if (name === 'password' && value.length < 6) {
      setError((prev) => ({ ...prev, password: 'Password must be at least 6 characters long' }));
    } else {
      setError((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Clear previous error messages
    setError({ form: '', username: '', email: '', password: '' });

    try {
      const response = await axios.post('https://project-auth-2zcr.onrender.com/register', formData);
      if (response.status === 201) {
        setRegisteredUsername(formData.username);
        setRegistrationSuccess(true);
        setFormData({ username: '', email: '', password: '' });
        console.log('Registration successful');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        const errorMsg = error.response.data.message;
        if (errorMsg.includes('Username')) {
          setError((prev) => ({ ...prev, username: errorMsg }));
        } else if (errorMsg.includes('Email')) {
          setError((prev) => ({ ...prev, email: errorMsg }));
        } else if (errorMsg.includes('Password')) {
          setError((prev) => ({ ...prev, password: errorMsg }));
        } else {
          setError((prev) => ({ ...prev, form: 'Something went wrong' }));
        }
      } else {
        setError((prev) => ({ ...prev, form: 'Something went wrong' }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {!registrationSuccess && (
        <div>
          <h2 className="heading">Register</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label htmlFor="username" className="label">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="input"
                required
              />
              {error.username && <div className="error">{error.username}</div>}
            </div>
            <div className="input-group">
              <label htmlFor="email" className="label">Email:</label>
              <input
                type="email"
                id="email1"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input"
                required
              />
              {error.email && <div className="error">{error.email}</div>}
            </div>
            <div className="input-group">
              <label htmlFor="password" className="label">Password:</label>
              <input
                type="password"
                id="password1"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input"
                minLength={6}
                required
              />
              {error.password && <div className="error">{error.password}</div>}
            </div>
            <button type="submit" className="button">Register</button>
          </form>
          {loading && <div className="loading">Registering...</div>}
          {error.form && <div className="error">{error.form}</div>}
        </div>
      )}
      {registrationSuccess && (
        <div className="registration-success-message">
          <p>Hello, {registeredUsername}!</p>
          <p>You have successfully registered!</p>
          <p>Now you can sign in using your credentials.</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
