import React from 'react'
import { useDispatch } from "react-redux"
import { auth } from "../reducers/auth"
import { Link } from 'react-router-dom'

export const Login = () => {
    const dispatch = useDispatch()

    const login = () => {
        dispatch(auth.actions.setToken(''))
        dispatch(auth.actions.setUser(''))
    }

    return (
        <div>
            Login page!
            <Link to='/secrets'><button onClick={login}>Set Token</button></Link>
        </div>
    )
}
