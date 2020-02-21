import React, { useState } from 'react'

const URL = 'https://harry-potter-auth.herokuapp.com/login'

export const Login = () => {
    // Vi måste ändra setState till rätt namn

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = event => {
        event.preventDefault()

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.log('error:', err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login to Hogwarts:</h1>
                <label>
                    Username:
            <input
                        required
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </label>
                <label>
                    Password:
            <input
                        required
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </label>
                <button type="submit" onClick={handleSubmit}>LOGIN</button>
            </form>
        </div>
    )
}
