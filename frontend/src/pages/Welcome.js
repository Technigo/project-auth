import React from 'react'
import { Link } from 'react-router-dom'

export const Welcome = () => {
  return (
    <div>
      <h1>Welcome to the Biggest Secret Ever!</h1>
      <Link className='button' to='/signup'>To Sign Up</Link>
      <Link className='button' to='/login'>To Login</Link>
    </div>
  )

}