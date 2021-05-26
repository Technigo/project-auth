import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import credentials, { generateText } from '../reducers/credentials'
import Form from '../components/Form.js'

const HomeScreen = () => {
    const message = useSelector(store => store.credentials.message)
    const dispatch = useDispatch()
    console.log(message)

    return (
        <>
            <Form />
        </>
    )
}

export default HomeScreen