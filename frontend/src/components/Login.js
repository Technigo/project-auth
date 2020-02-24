import React, { useState } from 'react'
import './login.css'

// const URL = 'http://localhost:9000/sessions'
// const URL = 'https://pb-auth-api.herokuapp.com/sessions'
const URL = process.env.REACT_APP_API_URL || 'https://pb-auth-api.herokuapp.com/sessions'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)

    // To log in an exicting member
    const handleFormSubmit = event => {
        event.preventDefault()

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return res.text().then(json => { throw new Error(json) })
                }
            })
            .then(user => {
                if (user['message']) {
                    setErrorMsg(user.message)
                }
                else {
                    window.localStorage.setItem('userId', user.userId)
                    window.localStorage.setItem('accessToken', user.accessToken)
                    window.location.href = '/MemberPage'
                }
            })
            .catch(err => console.log('error:', err))
    }

    // If user is logged out, show login form
    return (
        <section>
            <form className='loginForm' onSubmit={handleFormSubmit}>
                <h1><strong>Member login</strong></h1>
                <h2>Welcome back - we've missed you!</h2>
                <div className='loginContainer'>
                    <label >Username/Email:  </label>
                    <input value={email} placeholder='Enter Email' type='email' name='email' onChange={event => { setEmail(event.target.value) }} required></input>

                    <label>Password:     </label>
                    <input value={password} placeholder='Enter Password' type='password' name='password' onChange={event => { setPassword(event.target.value) }} required>
                    </input>
                    {errorMsg && <div className='error-message'> {errorMsg} </div>}
                    <button onClick={handleFormSubmit} type="submit">Login</button>
                </div>
            </form>
        </section>
    )
}

export default Login