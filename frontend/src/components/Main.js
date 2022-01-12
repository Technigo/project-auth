import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { API_URL } from '../utils/constants'
import thoughts from '../reducers/thoughts' 
import user from '../reducers/user'


const Main = () => {
    const thoughtsItems = useSelector((store) => store.thoughts.items)
    const accessToken = useSelector((store) => store.user.accessToken)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        // event.preventDefault()
        dispatch(user.actions.setAccessToken(''))
        // localStorage.clear()
    }

    useEffect(() => {
        if (!accessToken) {
            navigate('/login')
        }
    }, [accessToken, navigate])

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            },
        }
        fetch(API_URL('thoughts'), options)
        .then((res) => res.json)
        .then((data) => {
            if (data.success) {
                dispatch(thoughts.actions.setItems(data.response))
                dispatch(thoughts.actions.setError(null))
            } else {
                dispatch(thoughts.actions.setError(data.response))
                dispatch(thoughts.actions.setItems([]))
            }
        })
    }, [accessToken])

    return (
        <>
        <div>
            <div>
                <Link to="/login">To '/login'!</Link>
            </div>
            <h1>Protected happy thoughts:</h1>
			{thoughtsItems.map((item) => (
				<div key={item._id}>{item.message}</div>
			))}
        </div>
        <div>
            <button onClick={logout}>Sign out!</button>
        </div>
        </>
    )
}

export default Main