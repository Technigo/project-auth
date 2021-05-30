import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState(null)
    
    
    const accessToken= useSelector(store => store.user.accessToken)    
    const dispatch = useDispatch()
    const history = useHistory()
    const errors= useSelector(store => store.user.errors )

    useEffect(() => {
        //redirect user to '/path
        if (accessToken) {
            history.push('/welcome')
        }   
    }, [accessToken, history])

    const onFormSubmit = (e) => {
        e.preventDefault()

        const options = {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, password})
        }
        fetch(API_URL(mode), options)
          .then(res => res.json())
          .then(data => {
             if (data.success) {
                batch(() => {//batch updates all the dispatches at the same time, not one at a time
                    dispatch(user.actions.setUsername(data.username))
                    dispatch(user.actions.setAccessToken(data.accessToken))
                    dispatch(user.actions.setErrors(null))
                })
            } else {
                dispatch(user.actions.setErrors(data))
            }
        })
        .catch()
    }

    return (
    <div className="main-wrapper">
      <h1 className="login-title">Nice of you joining!</h1>
        <form className="boxes-wrapper" onSubmit={onFormSubmit}>
            <p>username</p>
            <input
             className="input-box"
             type="text" 
             value={username} 
             onChange={(e) => setUsername(e.target.value)}
             />
            <p>password</p>
            <input
               className="input-box"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            {errors && <p>something went wrong - sorry buddy. try again (harder)!</p>}
      <button className="button" type='submit' onClick={() => setMode('signup')}>Sign up</button>
        </form>
    </div>
    )
}

export default Signup