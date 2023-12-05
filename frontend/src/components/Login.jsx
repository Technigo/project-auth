import React from 'react'

export const Login = () => {
    return (
        <div className="login">
            <input
                type="text"
                placeholder="Username"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
        </div>
    )
}
