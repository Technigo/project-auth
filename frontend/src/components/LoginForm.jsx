import React, { useState } from 'react';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://authentication-j1oa.onrender.com/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // Handle successful login (e.g., store token in local storage and redirect)
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                // Handle login error (e.g., display error message to the user)
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Handle other errors (e.g., network issues)
        }
    };

    return (
        <form onSubmit={handleLogin}>
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
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
