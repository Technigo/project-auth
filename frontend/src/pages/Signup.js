import React, { useState } from 'react'

export const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <h1>Signup form!</h1>
            <form>
                <input required
                    value={name}
                    onChange={event => setName(event.target.value)}
                    placeholder="name"
                />
                <input required
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    placeholder="email"
                />
                <input required
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    placeholder="password"
                />
            </form>

        </div>
    )
}
