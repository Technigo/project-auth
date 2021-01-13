import React from 'react'
import { user, logout } from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const URL = 'https://login-logout-authentication.herokuapp.com/secrets'

export const Secret = () => {
  const dispatch = useDispatch()
  const name = useSelector((store) => store.user.login.name)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  // const userId = useSelector((store) => store.user.login.userId)
  const secretMessage = useSelector((store) => store.user.login.secretMessage)
  const errorMessage = useSelector((store) => store.user.login.errorMessage)

  const getSecret = () => {
    // Include userId in the path
    fetch(URL, {
      method: 'GET',
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Could not get information. Make sure you are logged in and try again'
        }
        return res.json()
      })
      .then((json) => {
        dispatch(
          user.actions.setSecretMessage({ secretMessage: JSON.stringify(json) })
        )
      })
      .catch((err) => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err})
        )
      })
  }
  // if (!accessToken) {
  //   return (
  //   <p>ACCESS DENIED!!</p>
  //   )
  // }

  return (
    <section class='profile'>
      <h2>`Welcome ${name}!`</h2>
      <p>{secretMessage}</p>
      <p>{errorMessage}</p>
        <input type='submit'
          onClick={(e) => getSecret()}
          value='Secret' />
        <Link to='/'>
          <input type='submit'
            onClick={(e) => dispatch(logout())} 
            value='Logout' />
       </Link>
    </section>
  )
}
