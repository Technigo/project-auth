/* eslint-disable linebreak-style */

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../reusable/urls'

import notes from '../reducers/notes'

import './main.css'

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const notesItems = useSelector((store) => store.notes.items)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/login')
    }
  }, [accessToken, history])

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken
        }
      }
      fetch(API_URL('notes'), options)
        .then((res) => res.json())
        .then((data) => dispatch(notes.actions.setNotes(data)))
    }
  }, [accessToken, dispatch])

  return (
    <div>
      <h2>Very secret notes</h2>
      {notesItems.map((note) => (
        <div className="notes" key={note._id}>{note.message}</div>
      ))}

    </div>
  )
}

export default Main