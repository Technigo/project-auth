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
            <div style="width:100%;height:0;padding-bottom:102%;position:relative;"><iframe src="https://giphy.com/embed/Z9b3BbCPSGMmZuMy7v" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen><a href="https://happy-thoughts-app-estefania.netlify.app/" alt="a link to the happy thoughts site"/></iframe></div>
            <button className="button" onClick={logout}>Logout</button>
        </div>
    )
}

export default Main