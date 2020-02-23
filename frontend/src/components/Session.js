import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { Login } from './Login'
import { Secret } from './Secret'
import { Signup } from './Signup'


export const Session = () => {
    const signUp = useSelector(store => store.auth.signUp)
    const loggedIn = useSelector(store => store.auth.loggedIn)
    return (
        <>
            {loggedIn === false && signUp === false && <Login />}
            {loggedIn === false && signUp === true && <Signup />}
            {loggedIn && <Secret />}
        </>
    )
}