import React, { useState, useEffect } from 'react'

export const AuthorizedUser = ({ authorization, setAuthorization}) => {

  const userId = localStorage.getItem('userId')
  const accessToken = localStorage.getItem('accessToken')

  useEffect( async () => {
    try {
      await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'POST',
        headers: {
          "Authorization": accessToken
        }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('not authorized')
        } 
        return res.json()
      })
      .then(res => {
        if (res.authorized) {
          setAuthorization(true)
        }
      })
    } catch (err) {
      console.log("not authorized", err)
    }
    
  }, [] )
  return (
    <>
    {authorization &&
      <div>
        Logged in
      </div>
    }

    {!authorization &&
      <div>
        Not authorized
      </div>
    }
    </>
  )
}