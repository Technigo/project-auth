import { useState } from 'react';

export const Register = () => {

    const [formData, setFormData] = useState({ name: '', email: ''});

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       console.log('Form data submitted:', formData);
    };


  return (
  <form onSubmit={handleSubmit}>
    <div>
        <label htmlFor="name">Name:</label>
        <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInput}
        placeholder="your name"
        />
    </div>

    <div>
    <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInput}
          placeholder="your email"
        />
    </div>

     <div>
    <label htmlFor="email">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.email}
          onChange={handleInput}
          placeholder="xxxx"
        />
    </div>
  </form>
  );
};
