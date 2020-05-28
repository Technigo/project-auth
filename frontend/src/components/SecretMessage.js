import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'


export const SecretMessage = () => {
  const url = "https://project-auth-ebba-elin.herokuapp.com/users"
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const handleSignOut = () => {
    localStorage.removeItem('accessToken')
    history.push('/')
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    fetch(url, {
      method: 'GET',
      headers: { 'Authorization': accessToken }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Access denied')
        }
        res.json().then(json => setMessage(json.secret))
      })
      .catch(err => {
        setError(err.message)
      })
  })

  return (

      <section>
          <div>
            {message}
           </div>
    
    </section>
  )
}