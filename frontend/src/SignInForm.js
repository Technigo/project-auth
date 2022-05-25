import React, {useState} from 'react'

export const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateUserLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://auth-login-form-project.herokuapp.com/signin', {
                method: 'POST',
                headers: {                
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email, password: password})
            });
            const authorizedLogin = await response.json();
            console.log(authorizedLogin);
            
            document.cookie = `accessToken=${authorizedLogin.accessToken}`;
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
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
