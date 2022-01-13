import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../utils/urls'
// import user from '../reducers/user'

const Main = () => {
    const accessToken = useSelector((store) => store.user.accessToken)

    const navigate = useNavigate()

    useEffect(() => {
        if (!accessToken) {
            navigate('/login')
        }
    }, [accessToken, navigate])

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: accessToken
            },
        }
        
        fetch(API_URL('poems'), options)
        .then((res) => res.json())
        .then((data) => console.log(data))
    
    }, [accessToken])

    return (
        <h1>Main</h1>
    )
}

export default Main