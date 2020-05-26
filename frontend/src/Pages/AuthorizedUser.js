import React, { useEffect } from 'react'
import { LogOut } from '../Components/LogOut'

export const AuthorizedUser = ({ authorization, setAuthorization, loggedIn, setLoggedIn}) => {

  const userId = localStorage.getItem('userId')
  const userName = localStorage.getItem('userName')
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    try {
      fetch(`http://localhost:8080/users/${userId}`, {
        method: 'POST',
        headers: {
          "Authorization": accessToken
        }
      })
      .then(res => {
        if (!res.ok) {
          console.log("not authorized")
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
      <div className="logged-in-page">
        <h2>
          Welcome {userName}!
        </h2>

        < LogOut loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        
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