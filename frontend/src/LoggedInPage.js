import React, {useState} from "react";
import { Navbar } from 'Navbar'

export const LoggedInPage = () => {
    const [loggedInUser, setLoggedInUser] = useState('log in first');
    
    const checkLoginStatus = async () => {
            try {
                const response = await fetch('https://auth-login-form-project.herokuapp.com/secrets', {
                    method: 'GET',
                    headers: {                
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem('accessToken'),
                    },
                    // mode: 'cors',
                    // credentials: 'include'
                });
                const loggedOutResponse = await response.json();
                console.log(loggedOutResponse.loginData);
                console.log(loggedOutResponse);
                setLoggedInUser(loggedOutResponse.loginData);

            } catch(err) {
                console.error(err);
            }
        };

    const LogOutSession = () => {
        sessionStorage.removeItem('accessToken');
        setLoggedInUser('log in first');
    }

    return (
        <div>
            {loggedInUser !== '' && <h1>Welcome to your account, {loggedInUser}</h1>}
            <Navbar />
            <button onClick={LogOutSession}>Log out</button>
            <button onClick={checkLoginStatus}>Access secret page</button>
        </div>
    )
}
