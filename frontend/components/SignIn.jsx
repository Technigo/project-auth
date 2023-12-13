// src/components/SignIn.js
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignIn = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Make a POST request to your login endpoint with formData
        // Handle success by saving the access token to local storage
        // Redirect to the dashboard page
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                {/* Your sign-in form fields go here */}
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
