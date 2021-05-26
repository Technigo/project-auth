import React from 'react'
import { useSelector } from 'react-redux'
import credentials from '../reducers/credentials'

const Main = () => {
    const name = useSelector(store => store.credentials.username)

    return (
        <>
            <h1>Welcome, {name}!</h1>
        </>
    )
}

export default Main