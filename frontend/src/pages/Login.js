import React from 'react'
import { useDispatch } from "react-redux"
import { auth } from "../reducers/auth"
import { Link } from 'react-router-dom'

export const Login = () => {
    const dispatch = useDispatch()

    const login = () => {
        dispatch(auth.actions.setToken('fc7d56b7d781b50dda47c6b0d5731265101dc11a21064845ac27ffd0950a0da5b52cab2d389e9f6fc42e23cfbdb556047a6aaad8bd2cc5c60163ddf99570f1658c32469a25837fc21747dbec3e73e213cfce555e56c19bcd2f413f4c2e3b6df74635aa63599aad8b573d20c831a5dcc29460756c50ec126d4a869a78c21a8aa8'))
    }

    return (
        <div>
            Login page!
            <Link to='/secrets'><button onClick={login}>Set Token</button></Link>
        </div>
    )
}
