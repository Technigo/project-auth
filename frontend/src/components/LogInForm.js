import React, { useState } from 'react'

const SIGNUP_URL = 'http://localhost:8080/users'

export const LogInForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = (event) => {
        event.preventDefault()
    
    fetch(SIGNUP_URL, {
        method: 'POST',
        body: JSON.stringify({name, email, password}),
        headers: {'Content-Type': 'application/json'},
    })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch(err => console.log('error:', err))
    }
    return (
        <form>
            <h1>Sign up</h1>
            <label>Name
                <input 
                    required
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
            </label>
            <label>E-mail
                <input
                    type="email"
                    required
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </label>
            <label>Password
                <input 
                    required
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </label>
            <button type="submit" onClick={handleSignUp}>SIGN UP</button>
            
        </form>
    )
}
