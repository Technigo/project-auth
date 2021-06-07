import React, {useEffect} from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { API_URL } from '../reusable/urls'

import thoughts from '../reducers/thoughts'

const Welcome = () => {
    const accessToken = useSelector(store => store.user.accessToken)

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
            <div className="main-wrapper">
                <iframe title="Welcome-gif" src="https://giphy.com/embed/l0MYC0LajbaPoEADu" width="350" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                <p className="text">Congratulation to becoming a member of the coolest crowd there is!</p>
                <p className="text">Don't get confused by the missing content on here. We are cool silently and inactively.</p>
                <h3 className="welcome-title">Now enter the memberarea <Link to="/login">here</Link></h3>
            </div>
        </div>
    )
}

export default Welcome