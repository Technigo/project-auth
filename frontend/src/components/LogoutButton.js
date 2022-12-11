import React from 'react'
import { useDispatch,  batch } from 'react-redux'
import user from 'reducers/user'


const LogoutButton = () => {
    const dispatch = useDispatch()
    return (

        <button onClick={() => {
            batch(() => {
                dispatch(user.actions.setUsername(null))
                dispatch(user.actions.setUserId(null))
                dispatch(user.actions.setAccessToken(null))
            })
          }}>
            Log out
          </button>
    )
}

export default LogoutButton