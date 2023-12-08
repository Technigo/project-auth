import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {useNavigate } from "react-router-dom"
import { userStore } from "../stores/userStore"

export const Login = () => {
    const signupAPI = "http://localhost:8081"
    const { username, setUsername, password, setPassword, user, setUser } = userStore()
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${signupAPI}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, password }),
            });
            console.log(response)

            if (response.ok) {
                const data = await response.json();
                setUser(data) //Updating the userData
                alert("Login successful!")
                navigate("/logged-in")

            } else {
                const errorData = await response.json(); // Extracting error message from response
                alert(`Login failed: ${errorData.error}`);
            }
        } catch (error) {
            alert('Error during login:', error.message);
        }

    }

    //just a console logging the user for debuggning purposes: 
    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className="login">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    )

}