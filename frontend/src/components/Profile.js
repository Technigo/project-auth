import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSecretMessage, logout } from '../reducers/user'

export const Profile = () => {
    const dispatch = useDispatch()
    const secretMessage = useSelector((store) => store.user.secretMessage)
    
    
    return (
    <div className="secret-message">
        <h1>Secret message</h1>
        <p>{`${secretMessage || 'You are now logged in. You can reveal the secret'}`}</p>
        <div className="buttons">
          <button
            type="submit"
            onClick={(e) => dispatch(getSecretMessage())}
            value="Reveal secret"
          > Reveal secret
          </button>
          <button
            type="submit"
            onClick={(e) => dispatch(logout())}
            value="Logout"
          >Log Out
          </button>
        </div>
    </div>
)}

