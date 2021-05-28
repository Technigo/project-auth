import React, {useEffect} from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { API_URL } from '../reusable/urls'

import thoughts from '../reducers/thoughts'


const Main = () => {
    const accessToken = useSelector(store => store.user.accessToken)
    const thoughtsItems = useSelector(store => store.thoughts.items)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!accessToken) {
            history.push('/login')
        }
    }, [accessToken, history]) 

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: 'accessToken'//added quotations to accessToken
            }
        }

        fetch(API_URL('thoughts'), options) //in the lesson it's done with /signin instead
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    batch(() => {
                        dispatch(thoughts.actions.setThoughts(data.thoughts))
                        dispatch(thoughts.actions.setErrors(null))
                    })
                } else {
                    dispatch(thoughts.actions.setErrors(data))
                }
            })
    }, [accessToken, dispatch])

    return (
        <div>
            <div>It is working! YAY!</div>
            <Link to='/login'>Let's login it's fun!</Link>
            {thoughtsItems.map(thought => (
                <div key={thought._id}>{thought.message}</div>
            ))}
        </div>
    )
}

export default Main