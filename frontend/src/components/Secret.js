import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const URL = 'http://localhost:8000/secrets'

export const Secret = () => {
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState("")


  // Hämtar accessToken från localStorage i webbläsaren,
  // och skickar in den i headers. 

  const handleSecret = () => {
    const accessToken = window.localStorage.getItem('accessToken')

    setErrorMessage('')
    fetch(URL, {
      method: "GET",
      headers: { "Authorization": accessToken }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Access denied')
        }
        return res.json()
      })
      .then(json => setMessage(json.message))
      .catch(err => {
        setErrorMessage(err.message)
      })
  }

  // if (!message) {
  //   return <div>We are trying to log you in</div>
  // }

  return (
    <article>
      <h1>{message}</h1>
      <div>
        <div>
          <button className="secret-button"
            type='submit'
            onClick={handleSecret}
          >
            Secret Button
          </button>
          <>
            {errorMessage && <div className="error">{errorMessage}</div>}
          </>
        </div>
        <Link to='/'>
          <button>
            <span role="img" aria-label="take me back">  ⬅️ </span> Back
          </button>
        </Link>
      </div>
    </article >
  )
}

