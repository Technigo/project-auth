import React, {useEffect} from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../reusable/urls'

import thoughts from '../reducers/thoughts'
import user from '../reducers/user'


const Main = () => {
    const accessToken = useSelector(store => store.user.accessToken)

    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        batch(() => {
            dispatch(user.actions.setUsername(null))
            dispatch(user.actions.setAccessToken(null))
        })
    }

    useEffect(() => {
        if (!accessToken) {
            history.push('/login')
        }
    }, [accessToken, history]) 

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: accessToken //added quotations to accessToken
            }
        }

        fetch(API_URL('thoughts'), options) 
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
        <div className="main-wrapper">
            <iframe className="happy-thoughts-site" width="100%" height="100%" src="https://happy-thoughts-app-estefania.netlify.app/" title="Happy Thoughts site"></iframe>
            <button className="button" onClick={logout}>Logout</button>
        </div>
    )
}

export default Main