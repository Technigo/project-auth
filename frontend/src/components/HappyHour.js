import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../reuseables/urls'
import drink from '../reducers/drink'

const HappyHour = () => {
    const accessToken = useSelector(store => store.user.accessToken)
    const drinks = useSelector(store => store.drink.items)
    
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (!accessToken) {
            history.push('/signin')
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
                if (data.success) {
                    batch(() => {
                        dispatch(drink.actions.setDrink(data.drink))
                        dispatch(drink.actions.setErrors(null))
                    })
                } else {
                    dispatch(drink.actions.setErrors(data))
                }
            })
    }, [accessToken, dispatch])

    return (
        <div>
           {drinks.map(recipe => (
                <div key={recipe.id}>{recipe.title}</div>
            ))
           }
        </div>
    )
}

export default HappyHour