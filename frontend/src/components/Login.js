import React, { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={onFormSubmit}>
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign in</button>
            <button type="submit">Sign up</button>
            {/* onClick={() => () */}
        </form>
    )
}



export default Login