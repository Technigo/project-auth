import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const AuthContainer = ({ onLoginSuccess }) => {
    const [error, setError] = useState(null);

    const handleRegistration = async (formData) => {
        try {
            const response = await fetch('https://authentication-j1oa.onrender.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                onLoginSuccess(data.accessToken);
            } else {
                const errorData = await response.json();
                setError(errorData.error);
                console.error('Registration failed:', errorData.error);
            }
        } catch (error) {
            setError('Error during registration. Please try again.');
            console.error('Error during registration:', error);
        }
    };

    const handleLogin = async (formData) => {
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
                onLoginSuccess(data.accessToken);
            } else {
                const errorData = await response.json();
                setError(errorData.error);
                console.error('Login failed:', errorData.error);
            }
        } catch (error) {
            setError('Error during login. Please try again.');
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <h1>Authentication</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <RegistrationForm onRegistration={handleRegistration} />
            <LoginForm onLogin={handleLogin} />
        </div>
    );
};

export default AuthContainer;
