import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, NoteTextInput, ProfileSection } from '../styling/form'

export const Notes = () => {
    const accessToken = useSelector((store) => store.user.login.accessToken)
    const [note, setNote] = useState('')

    const NOTE_URL = 'http://localhost:8080/notes'
    const handleNote = (event) => {
        event.preventDefault()
    
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
      }

    return (
        <ProfileSection>
          <h1>Write your note</h1>
            <form>
                <NoteTextInput
                    type='text'
                    required
                    value={note}
                    onChange={(event) => setNote(event.target.value)}    
                >
                </NoteTextInput>
                <Button 
                  type='submit' 
                  onClick={handleNote}
                >
                  Add note
                </Button> 
            </form>
        </ProfileSection>
    )
}
export default Notes