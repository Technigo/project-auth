import React from 'react'
import '../index.css'
import SecretImage from '../secret_pixel.png'
import { useHistory } from 'react-router-dom'

export const StartPage = () => {
  const history = useHistory()
  
  return (
    <main>
      <h1>Sign up or sign in to see todays secret picture!</h1>
      <div className='buttonRow'>
        <button onClick={() => history.push("/users")}>Sign Up</button>
        <button onClick={() => history.push("/sessions")}>Sign In</button>
      </div>
      <img src={SecretImage} className='secretImage' alt='blurred image' />
    </main>
  )
}
