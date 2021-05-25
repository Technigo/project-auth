import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import credentials, { generateText } from '../reducers/credentials'

const HomeScreen = () => {
    const message = useSelector(store => store.credentials.message)
    const dispatch = useDispatch()
    console.log(message)

    dispatch(generateText())
    return (
        <h1>{message}</h1>
    )
}

export default HomeScreen