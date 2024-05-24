import { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // State to store error message
  const [error, setError] = useState('');

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://project-auth-2zcr.onrender.com/register', formData);
      console.log(response.data);
      if (response.status === 201) {
        setRegistrationSuccess(true);
        setFormData({ username: '', email: '', password: '' });
        console.log('Registration successful');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <div className="form-container">
      {!registrationSuccess && (
        <div>
          {error && <div className="error">{error}</div>}
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
            </div>
            <div className="input-group">
              <label htmlFor="email" className="label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="label">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input"
                minLength={6}
                required
              />
            </div>
            <button type="submit" className="button">Register</button>
          </form>
        </div>
      )}
      {registrationSuccess && (
        <div className="registration-success-message">
          <p>Hello, {formData.username}!</p>
          <p>You have successfully registered!</p>
          <p>Now you can sign in using your credentials.</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
