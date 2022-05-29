import React, { useState } from 'react'
import { Navbar } from 'Navbar'

export const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateUserLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://auth-login-form-project.herokuapp.com/signin', {
                method: 'POST',
                // credentials: 'include',
                headers: {                
                    'Content-Type': 'application/json'
                },
                // mode: 'cors',
                // credentials: 'include',
                body: JSON.stringify({email: email, password: password})
            });
            const authorizedLogin = await response.json();
            console.log(authorizedLogin);              
            sessionStorage.setItem('accessToken', authorizedLogin.accessToken);      
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
            <Navbar />
            <form onSubmit={validateUserLogin}>
                Already an user? Login:
            <label>
                Email:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
