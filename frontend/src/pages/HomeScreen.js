import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import credentials, { generateText } from '../reducers/credentials'
import Form from '../components/Form.js'

const HomeScreen = () => {
    const message = useSelector(store => store.credentials.message)
    const dispatch = useDispatch()
    console.log(message)

    dispatch(generateText())
    return (
        <>
            <h2>Sign Up</h2>
            <Form mode={'signup'}/>
            <h2>Sign In</h2>
            <Form mode={'signin'}/>
        </>
    )
}

export default HomeScreen