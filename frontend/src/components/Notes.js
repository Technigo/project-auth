import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NotesContainer } from './NotesContainer'
import { Button, ProfileSection } from '../styling/form'
import { NotesList, NotesForm } from '../styling/notes'

//const NOTE_URL = 'http://localhost:8080/notes'
const NOTE_URL = 'https://project-auth-olof.herokuapp.com/notes'

export const Notes = () => {
  const [note, setNote] = useState('')
  const [noteList, setNoteList] = useState([])

  const accessToken = useSelector((store) => store.user.login.accessToken)

  // POST new note from submit
  const handleNote = (event) => {
    event.preventDefault()
    setNote('')

    fetch(NOTE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: accessToken },
      body: JSON.stringify({ description: note }),
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Note save failed'
        }
        return res.json()
      })
      .catch(error => console.error(error))
    }

  const handleNoteList = () => {
    fetch(NOTE_URL, {
      method: 'GET',
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Get notes failed'
        }
        return res.json()
      })
      .then(data => setNoteList(data))
      .catch(error => console.error(error))
  }

  //get notes
  handleNoteList()

  return (
    <ProfileSection>
        <NotesForm>
          <h1>Write your note</h1>
          <textarea
            rows='5'
            required
            value={note}
            onChange={(event) => setNote(event.target.value)}   
          ></textarea>
          <Button 
            type='submit' 
            onClick={handleNote}
          >
            Add note
          </Button> 
        </NotesForm>

        <NotesList>
          {noteList.map(note => {
              return (
                <NotesContainer 
                  key={note._id}
                  description={note.description}
                  created={note.createdAt}
                />
              )
          })}
        </NotesList>
    </ProfileSection>
  )
}
export default Notes