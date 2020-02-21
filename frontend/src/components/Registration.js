import React, { useState } from 'react'
import './registration.css'
import { Link, useHistory } from "react-router-dom"

const URL = 'http://localhost:8080/users'

export const Registration = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const handleSubmit = event => {
        event.preventdefault()

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: { 'Content-Type': 'application/json' }
        })
          .then(res => res.json())
          .then(json => console.log(json))
          .catch(err => console.log('error:', err))
    }

    return (
        <section>
            <form class="Regform" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <label className="Namefield">
                  Name:
                <input 
                required 
                className="TextInput" 
                value={name} 
                onChange={event => setName(event.target.value)}
                />
                </label>
                <label className="Emailfield">
                  Email:
                <input 
                required 
                className="EmailInput" 
                value={email} 
                type="email"
                onChange={event => setEmail(event.target.value)}
                  />
                </label>  
                <label className="Passwordfield">
                  Password:
                <input 
                  required 
                  className="PasswordInput" 
                  value={password} 
                  type="password" 
                  onChange={event => setPassword(event.target.value)}
                />
                </label>
                <button type="submit" onClick={handleSubmit}>SIGN UP</button>
            </form>
        </section>
    )
}