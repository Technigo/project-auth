import { useState } from 'react';
import './LoginForm.css';
import { BtnLogin } from './Buttons';
import { useStore } from '../stores/storeData'

export const LoginForm = () => {
  const { hideForms } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="login-container">
      <div>
        <div className="input-field">
          <input
            type="name"
            id="name"
            name="name"
            placeholder="user"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-field">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <div className="input-field">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-envelope"></i>
          <br />
        </div>
        <small>We'll never share your email with anyone else 🤣</small>
        <div className="buttons">
          <div className="button-container">
            <button
              className="back-btn"
              onClick={hideForms}
              type="button"
            >
              back
            </button>
          </div>
          <BtnLogin />
        </div>
      </div>
    </form>
  );
};
