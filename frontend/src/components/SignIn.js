import React, { useState } from 'react'

const URL = 'http://localhost:8080/sessions'

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signedIn, setSignedIn] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const fetchProfile = async() => {
   const response = await
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ email, password}),
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await response.json()
      return json
    }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchProfile().then(data => {
      if (data.notFound) {
        setErrorMessage('Username or password is invalid')
        setSignedIn(false)
      } else {
             window.localStorage.setItem('accessToken', data.accessToken)
             setErrorMessage('')
             setSignedIn(true)
      }
    })   
  }
  const signOut = () => {
    window.localStorage.clear()
    setSignedIn(false)
  }

  const accessTokenTest = window.localStorage.getItem('accessToken')
  return ( 
    <>
    {signedIn &&
    <button type='button' onClick={signOut}>Sign out </button>}
    {accessTokenTest && <p>{accessTokenTest}</p>}
    {errorMessage && <p>{errorMessage}</p>}
   {!signedIn && 
   <>
    <form className='signin-form' onSubmit={handleSubmit} >
    <label>
    Email 
    <input type = 'email'
    value = { email }
    onChange = {(event) => { setEmail(event.target.value) }} /> 
    </label>
    <label>
    Password 
    <input type = 'password'
    value = { password }
    onChange = {(event) => { setPassword(event.target.value) }} /> 
    </label> 
    <button className='signin-button' type='submit'> Sign in </button> 
    </form> 
    <p> { `Signed in: ${signedIn}`} </p></> }
    </>
  )}