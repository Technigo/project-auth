import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSecretMessage, logout } from '../reducers/user'

export const Profile = () => {
    const dispatch = useDispatch()
    const secretMessage = useSelector((store) => store.user.secretMessage)
    
    
    return (

        //add dispatch(getsecretMessage and logout
    <div>
        <h1>Secret message</h1>
        <p>{`${secretMessage || 'You are now logged in. You can reveal the secret'}`}</p>
        <input
        type="submit"
        onClick={(e) => dispatch(getSecretMessage())}
        value="Reveal secret"
      />
      <button
        type="submit"
        onClick={(e) => dispatch(logout())}
        value="Test Logout"
      >Log Out</button>
    </div>
)}

