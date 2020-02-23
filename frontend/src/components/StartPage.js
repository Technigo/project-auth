import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import SecretImage from '../secret_pixel.png'

export const StartPage = () => {
  return (
    <main>
      <h1>Sign up or sign in to see todays secret picture!</h1>
      <div className='buttonRow'>
        <Link to='/users' className='button'>
          Sign Up
        </Link>
        <Link to='/sessions' className='button'>
          Sign In
        </Link>
      </div>
      <img src={SecretImage} className='secretImage' alt='blurred image' />
    </main>
  )
}
