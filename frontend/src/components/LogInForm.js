import React, { useState } from 'react'
import {Link} from 'react-router-dom'

export const LogInForm = () => {
    
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogIn = (event) => {
        event.preventDefault()
        console.log("Log In")

        fetch('https://localhost:8080/sessions', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' }
          })
          .then(res => {
            if (!res.ok) {
              throw new Error('Your e-mail and/or password was incorrect')
            }
            return res.json()
          })
        //   .then(({ accessToken }) => {
        //     window.localStorage.setItem('accessToken', accessToken)
        //     onLoggedIn()
        //   })
          .catch(err => {
            setErrorMessage(err.message)
          })
    }


return (
    <div>
        <form onLogIn={handleLogIn}>
            <h2>Log In</h2>
            <label>
                <p>E-mail:</p>
                <input required type="text" value={email} />
            </label>
            <label>
                <p>Password:</p>
                <input required type="password" placeholder="Enter Password" value={password} />
            </label>
            <div className='btn-Container'>
          <button  type='submit' className='btn' >Login</button>
        </div>
        </form>
    </div>
)
}