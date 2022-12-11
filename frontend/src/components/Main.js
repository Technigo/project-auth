import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import thoughts from 'reducers/thoughts'
import { API_URL } from 'utils/utils'
import { useNavigate } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items)
    const dispatch = useDispatch()
    const accessToken = useSelector((store) => store.user.accessToken)

    const navigate = useNavigate()

    useEffect(() => {
        if (!accessToken) {
            navigate('/login')
        }
    }, [accessToken])

    useEffect(() => {

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        }
        fetch(API_URL('thoughts'), options)
            .then(res => res.json())
            .then(data => {
                console.log({data})
                if(data.success) {
                    console.log('success')
                    console.log(data.response)
                    dispatch(thoughts.actions.setItems(data.response))
                    dispatch(thoughts.actions.setError(null))
                } else {
                    dispatch(thoughts.actions.setItems([]))
                    dispatch(thoughts.actions.setError(data.response))
                }
            })
    }, [])

    console.log(thoughtItems)
    return (
        <>
          <LogoutButton />
          <h2>This is the main component</h2>
          {thoughtItems && thoughtItems.map((item) => {
              return <p key={item._id}>{item.message}</p>
          })}
        </>
    )
}

export default Main