import { useState } from 'react';
import './register-form.css'

export const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <div className='form-container'>
    <form onSubmit={handleSubmit} className="register-form">
      <h1 classname="register-header">Register</h1>
      <div className="form-group">
        <label htmlFor="name" className="label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInput}
          placeholder="Your name"
          className="input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInput}
          placeholder="Your email"
          className="input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInput}
          placeholder="xxxx"
          className="input"
        />
      </div>
      <div className="form-group">
          <button type="submit" className="register-button">
            Register
          </button>
        </div>

        <div className="form-group">
          <p>Already have an account? Log in here</p>
        </div>
    </form>
    </div>
  );
};

