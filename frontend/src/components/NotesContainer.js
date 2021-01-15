import React from 'react'
import moment from 'moment'
import { NotesSection } from '../styling/notes'

export const NotesContainer = ( {description, created} ) => {
    return (
        <NotesSection>
            <p>{description}</p>
            <p className="created">{moment(created).fromNow()}</p>
        </NotesSection> 
    )
}
export default NotesContainer