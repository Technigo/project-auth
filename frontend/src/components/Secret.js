import React, { useState, useEffect } from 'react'
import '../index.css'
import { Link } from 'react-router-dom'

const URL = 'http://localhost:3000/secrets'

export const Secret = ({ accessToken }) => {
  const [secret, setSecret] = useState()

  useEffect(() => {
    fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    })
      .then((res) => res.json())
      .then((object) => {
        setSecret(object.secret)
      })
  }, [])

  return (
    <div className='secret'>
      {secret ? (
        <>
          <h1>Here is the secret picture!</h1>
          <img className='revealedSecret' src={secret} />
          <Link to='/' className='signOut'>
            Sign Out
          </Link>
        </>
      ) : (
        <>
          <Link to='/sessions'>Sign in</Link> to see the secret picture
        </>
      )}
    </div>
  )
}
