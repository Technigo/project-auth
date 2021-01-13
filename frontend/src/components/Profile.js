import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSecretMessage } from '../reducers/user'

export const Profile = () => {
    const dispatch = useDispatch()
    const secretMessage = useSelector((store) => store.user.login.secretMessage)
    
    
    return (

        //add dispatch(getsecretMessage and logout
    <div>
        <h1>Secret message</h1>
        <p>{`${secretMessage}`}</p>
        <input
        type="submit"
        onClick={(e) => dispatch(getSecretMessage())}
        value="Secret Endpoint"
      />
    </div>
)}