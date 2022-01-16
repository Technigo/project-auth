import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../utils/constants'
import thoughts from '../reducers/thoughts'

const Main = () => {
    
    const thoughtsItems = useSelector((store) => store.thoughts.items)
    const accessToken = useSelector((store) => store.user.accessToken)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!accessToken) {
            navigate('/login')
        }
    }, [accessToken, navigate])

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': accessToken,
            },
        }

        fetch(API_URL('thoughts'), options)
            .then((response) => response.json())
            .then((data) => {
                dispatch(thoughts.actions.setItems(data.response))
            })
    }, [accessToken])

    return (
        <section>
            <h1>Protected Happy Thoughts:</h1>
            {thoughtsItems.map((item) => (
                <article key={item._id}>{item.message}</article>
            ))}
        </section>
    )
}

export default Main