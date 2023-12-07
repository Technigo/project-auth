//OBS KOPIERAT FRÅN REGISTER FORM NU
import { useState } from 'react';

export const SignIn = () => {
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
    <form onSubmit={handleSubmit} className="register-form">
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
    </form>
  );
};
