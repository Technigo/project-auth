import React, { useState } from 'react'

const Login = () => {
    const [ username, setUsername ] = useState("")
    const [password, setPassword ] = useState("")
    return (
        <form>
            <label htmlFor='username' >Username</label>
            <input id="username" type= "text" value={username} onChange= {(e) => setUsername(e.target.value)} />

            <label htmlFor='password' >Password</label>
            <input id="password" type= "password" value={password} onChange= {(e) => setPassword(e.target.value)} />
        </form>
    )
}

export default Login