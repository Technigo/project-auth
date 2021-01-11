
//- A page to show the authenticated content from the API.
//- A 'sign out' button that removes the saved access token and redirects the user to the login form.

// and return error messages which could be shown by the frontend (displaying 
// the errors in a nice way in the frontend is a stretch goal
// - its fine to just show 'Something went wrong' on the frontend if you run out of time)

// who logged in
// button reveal secret message

// clean dispatches!

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSecretMessage, logout } from '../reducers/user'

import { Button } from './Button'

export const Profile = () => {
  const userName = useSelector(store => store.user.login.name)
  console.log(userName)
  const userId = useSelector(store => store.user.login.userId)
  console.log(userId)
  const secretMessage = useSelector(store => store.user.login.secretMessage)

  const dispatch = useDispatch()

  return (
    <div>
      <h1>Welcome {userName}</h1>
      <p>Name: {userName}</p> 
      {secretMessage && <p>{secretMessage}</p>}
      <Button
      type='submit'
      onClick={()=> dispatch(getSecretMessage())}
      text='Reveal your secret message'
      />
      <Button
      type='submit'
      onClick={()=> dispatch(logout())}
      text='Log out'
      />
    </div>
  )
}