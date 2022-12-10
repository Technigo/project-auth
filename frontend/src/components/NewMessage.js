import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "utils/utils";
import posts from "reducers/posts";
import { Button } from "./Buttons"
import { Form } from "./LogIn"
import { ButtonDiv } from "./Buttons";

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
        <Form onSubmit={onFormSubmit}>
          <Textarea
            id="newMessage"
            placeholder="..." 
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}></Textarea>
          <ButtonDiv>
            <Button type="submit">Post new message</Button>
          </ButtonDiv>
        </Form>
      </NewMessageInnerSection>
    </NewMessageOuterSection>
  )
}

export default NewMessage

const NewMessageOuterSection = styled.section`
  background-color: #FFEEE3;
  border-radius: 20px;
  width: 100%;
  margin-bottom: 10px;
`

const NewMessageInnerSection = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
` 

const Textarea = styled.textarea`
  border: none;
  border-radius: 5px;
`