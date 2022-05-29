import React, {useState} from 'react'
import { Navbar } from 'Navbar'

export const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //prevent duplicate data/several clicks on post to be store (code in backend + frontend?)

    const createUserLogin = async (e) => {
        e.preventDefault();
        console.log('Submitted:' + username + ' ' + email + ' ' + password)

        // if (!response.ok) {
        //     const errorMessage = `An error has occurred: ${response.status}`;
        //     throw new Error(errorMessage);
        // } 
        try {
            const response = await fetch('https://auth-login-form-project.herokuapp.com/signup', {
                method: 'POST',
                headers: {
                    
                    'Content-Type': 'application/json',
                    'Credentials': 'same-origin'
                },
                body: JSON.stringify({name: username, email: email, password: password})
            });
            
            const signupInfo = await response.json();
            console.log(signupInfo);
            
        } catch(err) {
            const errorMessage = `An error has occurred: ${response.status}`;
        }
    }

    return (
        <div>
            <Navbar />
            <form onSubmit={createUserLogin}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
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
