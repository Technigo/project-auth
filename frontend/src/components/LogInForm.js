import React, { useState } from 'react'
import {Link} from 'react-router-dom'

export const LogInForm = () => {
    
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogIn = (event) => {
        event.preventDefault()
        console.log("Log In")

        const onLoggedIn = () => {
          console.log('login success')
          // window.location.href='/secrets'
        }

        fetch('http://localhost:8080/sessions', {
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
          .then(({ accessToken }) => {
            window.localStorage.setItem('accessToken', accessToken)

           onLoggedIn() 
          })
          .catch(err => {
            setErrorMessage(err.message)
          })
    }


return (
    <div className='backgroundContainer'>
        <form className='mainContainer' onSubmit={handleLogIn}>
            <h2>Login</h2>
            <label className='text'>
                <p>E-mail and Password:</p>
                <input className='formField' required type="email" placeholder="email@mail.com" value={email} onChange={event => setEmail(event.target.value)} />
            </label>
            <label className='text'>
                <input className='formField' required type="password" placeholder="Enter Password" value={password} onChange={event => setPassword(event.target.value)}/>
            </label>
            <div className='btn-Container'>
          <button type='submit' className='btn'>Login</button>
        </div>
        </form>
    </div>
)
}

// onClick={() => (window.location.href ="/MemberSite")}