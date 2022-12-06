import React, { useState } from 'react'

export const UserInput = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

return (
    <form>
        <input type="text" value={username} placeholder="Username" onChange={(event)=> setUsername(event.target.value)} />
        <input type="text" value={password} placeholder="Password" onChange={(event)=> setPassword(event.target.value)} />

    </form>
)
}