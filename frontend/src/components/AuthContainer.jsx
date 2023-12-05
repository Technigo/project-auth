import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

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
                // Registration successful
                setError(null);
                console.log('Registration successful');
                // You can add any additional logic here
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
        // Login logic remains here
        // ...
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
