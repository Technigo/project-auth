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

  //POST new thought - added this on friday!
  useEffect(() => {
    const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ message: newThought })
    }
    fetch(API_URL('thoughts'), options)
      .then(res => res.json()) 
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(thoughts.actions.setThoughts(newThought))
            dispatch(thoughts.actions.setErrors(null))
          })
        } else {
          dispatch(thoughts.actions.setErrors(data))
        }
      })
    }
  }, [accessToken, dispatch, newThought])

  const onLogout = () => {
    dispatch(user.actions.setReturnInitialState()) 
    dispatch(thoughts.actions.setThoughts([])) // set thoughts items []    
    localStorage.removeItem('user') // remve user from localStorage 
  }

  // could not reach onFormSubmit from inside useEffect therefore added this which is not correct ~ work on this! 
  return (
    <>
      <form onSubmit={() => dispatch(thoughts.actions.setThoughts(newThought))}> 
        <label htmlFor="newThought">Write your message here</label>
          <textarea
            id="newThought"
            type="text"
            maxLength="80"
            value={newThought}
            onChange={onNewThoughtChange}
            placeholder="Write your thoughts here, you will contribute to our database 😊">
          </textarea>
          <button>Post new thought</button>
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