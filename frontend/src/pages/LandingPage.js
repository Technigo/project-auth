import React, { useState, useEffect } from 'react' 
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../reusable/urls'
import thoughts from '../reducers/thoughts'
import user from '../reducers/user'

const LandingPage = () => {
  const [newThought, setNewThought] = useState('')
  const accessToken = useSelector(store => store.user.accessToken)
  const thoughtsList = useSelector(store => store.thoughts.items)

  const dispatch = useDispatch()
  const history = useHistory()

  // Redirect to signup or login when there is no accessToken
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

  const onNewThoughtChange = (e) => {
    setNewThought(e.target.value)
  }

  // POST again: 
  const onFormSubmit = (e) => {
    console.log('onsubmit')
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken
      },
      body: JSON.stringify({ message: newThought })
    }
    fetch(API_URL('thoughts'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data)
          batch(() => {
            dispatch(thoughts.actions.setThoughts(data.thoughts)) //newThought // data.message
            dispatch(thoughts.actions.setErrors(null))
          })
        } else {
          dispatch(thoughts.actions.setErrors(data))
        }
      })
    setNewThought('')
  }


  const onLogout = () => {
    localStorage.removeItem('user') // remve user from localStorage 
    dispatch(user.actions.setReturnInitialState()) 
    dispatch(thoughts.actions.setThoughts([])) // set thoughts items []    
  }

  return (
    <>
      <form onSubmit={onFormSubmit}> 
        <label htmlFor="newThought">Write your message here</label>
          <textarea
            id="newThought"
            type="text"
            maxLength="80"
            value={newThought}
            onChange={onNewThoughtChange}
            placeholder="Write your thoughts here, you will contribute to our database 😊">
          </textarea>
          <button type="submit">Post new thought</button>
        </form>
       {thoughtsList.map(thought => {
        console.log(thought)
        return (
          <div key={thought._id}>
          <p>{thought.message}</p>
        </div>
        )
      })}
      <button onClick={onLogout}>Log out</button>
    </>
  )
}

export default LandingPage