import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../reuseables/urls'

// import drink from '../reducers/drink'
import user from '../reducers/user'

const HappyHour = () => {
    const accessToken = useSelector(store => store.user.accessToken)
    const secretMessage = useSelector(store => store.user.secretMessage)
    // const drinkRecipes = useSelector(store => store.drink.items)

    
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
                Authorization: accessToken
            }
        }
        fetch(API_URL('happyhour'), options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    batch(() => {
                        dispatch(user.actions.setSecretMessage(data.secretMessage))
                        dispatch(user.actions.setErrors(null))
                    })
                } else {
                    dispatch(user.actions.setErrors(data))
                }
            })
        
    }, [accessToken, dispatch]) 

    console.log('New log', secretMessage)
    return (
        <div>
            {secretMessage}
            <iframe src="https://giphy.com/embed/cXgGNaWiSoesw" 
                width="480"
                height="471"
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
            />
            <p>
                <a href="https://giphy.com/gifs/cat-party-cXgGNaWiSoesw">via GIPHY</a>
            </p>
            <button onClick={() => dispatch(user.actions.setLogout())}>Log Out</button>
        </div>
    )
}

export default HappyHour