import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { API_URL } from "utils/utils";
import posts from "reducers/posts";
import { useSelector } from 'react-redux'

const NewMessage = () => {
  const [message, setMessage] = useState('')
  const accessToken = useSelector((store) => store.user.accessToken)
  const dispatch = useDispatch()

  const onFormSubmit = (event) => {
    event.preventDefault()
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      },
      body: JSON.stringify({message: message})
    }
    fetch(API_URL("posts"), options)
      .then(res => res.json())
      .then(data => {
        setMessage('')
      })
  }

  return (
    <NewMessageSection>
      <div>
        <form onSubmit={onFormSubmit}>
          <textarea
            id="newMessage"
            placeholder="Post new message" 
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}></textarea>
          <button type="submit">Post new message</button>
        </form>
      </div>
    </NewMessageSection>
  )
}

export default NewMessage

const NewMessageSection = styled.section`
  background-color: #FFEEE3;
  padding: 30px;
  border-radius: 20px;
`