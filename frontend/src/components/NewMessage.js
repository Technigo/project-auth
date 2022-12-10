import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "utils/utils";
import posts from "reducers/posts";
// nya meddelanden måste kopplas till redux-storen för att automatiskt synas i feed. 

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
        console.log(data)
        dispatch(posts.actions.setNewItems(data.response))
      })
  }

  return (
    <NewMessageOuterSection>
      <NewMessageInnerSection>
        <form onSubmit={onFormSubmit}>
          <textarea
            id="newMessage"
            placeholder="Post new message" 
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}></textarea>
          <button type="submit">Post new message</button>
        </form>
      </NewMessageInnerSection>
    </NewMessageOuterSection>
  )
}

export default NewMessage

const NewMessageOuterSection = styled.section`
  background-color: #FFEEE3;
  border-radius: 20px;
  padding: 20px;
`

const NewMessageInnerSection = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  ` 