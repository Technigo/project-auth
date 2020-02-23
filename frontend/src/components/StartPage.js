import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import SecretImage from '../secret_pixel.png'

const URL = 'http://localhost:3000/'

export const StartPage = () => {
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((json) => json.results)
  }, [])

  return (
    <main>
      <h1>Sign up or Sign in to see todays secret picture!</h1>
      <div className='buttonRow'>
        <Link to='/users' className='buttonSignUp'>
          <p>Sign Up</p>
        </Link>
        <Link to='/sessions' className='buttonSignIn'>
          <p>Sign In</p>
        </Link>
      </div>
      <img src={SecretImage} className='secretImage' alt='blurred image' />
    </main>
  )
}
