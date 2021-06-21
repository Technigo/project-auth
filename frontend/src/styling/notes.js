import styled from 'styled-components'

export const NotesSection = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 width: 80%;
 max-width: 500px;
 margin-bottom: 40px;
 padding: 20px;
 background-color: #fff;
 border: 2px solid #000;
 box-shadow: 6px 6px #000;
 word-wrap: break-word;
`

export const NotesList = styled.div`
 display: flex;
 flex-direction: column;
 text-align: left;
`

export const NotesForm = styled.form`
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 width: 80%;
 max-width: 500px;
 margin: 50px 0 40px 0;
 padding: 20px;
 background-color: #f3f1f1;
 border: 2px solid #000;
 box-shadow: 6px 6px #000;
`