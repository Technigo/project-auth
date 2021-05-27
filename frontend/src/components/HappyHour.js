import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../reuseables/urls'

import drink from '../reducers/drink'

const HappyHour = () => {
    const accessToken = useSelector(store => store.user.accessToken)
    const drinkRecipes = useSelector(store => store.drink.items)
    
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
                        dispatch(drink.actions.setDrink([data])) //.drink?
                        dispatch(drink.actions.setErrors(null))
                    })
                } else {
                    dispatch(drink.actions.setErrors(data))
                }
            })
        
    }, [accessToken]) 

    console.log('New log', drinkRecipes)
    return (
        <div>
           {/* {drinkRecipes.map((item) => (
                <div key={item._id}>Recipe:{item.title}</div>
            ))} */}
        </div>
    )
}

export default HappyHour