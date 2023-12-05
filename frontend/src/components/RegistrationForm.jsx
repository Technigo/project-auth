import React, { useState } from 'react';

const RegistrationForm = ({ onRegistration }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        // Trigger the registration process through the callback prop
        onRegistration(formData);
    };

    return (
        <form onSubmit={handleRegistration}>
            <h1>Registration Form</h1>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
