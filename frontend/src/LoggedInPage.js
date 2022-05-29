import React from "react";
import { Navbar } from 'Navbar'

export const LoggedInPage = () => {
    
    const checkLoginStatus = async () => {
            try {
                const response = await fetch('https://auth-login-form-project.herokuapp.com/secrets', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {                
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': true
                    },
                    // mode: 'cors',
                    // credentials: 'include'
                });
                const loggedOutResponse = await response.json();
                console.log(loggedOutResponse.loginData);
                console.log(loggedOutResponse);

            } catch(err) {
                console.error(err);
            }
        };


    const LogOutSession = async () => {
        try {
            const response = await fetch('https://auth-login-form-project.herokuapp.com/logout', {
                method: 'GET',
                headers: {                
                    'Content-Type': 'application/json',
                },
            });
            const loggedOutResponse = await response.json();
            console.log(loggedOutResponse.response);

        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
            <Navbar />
            <button onClick={LogOutSession}>Log out</button>
            <button onClick={checkLoginStatus}>Access secret page</button>
        </div>
    )
}
