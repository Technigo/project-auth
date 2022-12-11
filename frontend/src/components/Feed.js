import styled from "styled-components";
import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from 'react-redux'
import posts from 'reducers/posts'
import { API_URL } from "utils/utils";
import { useNavigate } from "react-router-dom";
import NewMessage from "./NewMessage";
import Moment from 'react-moment'
import { Button } from "./Buttons";
import user from "reducers/user";

const Feed = () => {
  const postItems = useSelector((store) => store.posts.items)
  const accessToken = useSelector((store) => store.user.accessToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(!accessToken) {
      navigate("/login")
    }
  }, [accessToken])
  
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      }

    }
    fetch(API_URL("posts"), options)
      .then(res => res.json())
      .then(data => {
        if(data.sucess) {
            dispatch(posts.actions.setItems(data.response))
            dispatch(posts.actions.setError(null))
        } else {
          dispatch(posts.actions.setItems([]))
          dispatch(posts.actions.setError(data.response))
        }
      })
  }, [])

  return (
    <>
      <FeedSection>
        <ClonedButton
          type="button"
          onClick={() => {
            dispatch(user.actions.logOut())
            navigate("/login")}}> 
          Sign out
        </ClonedButton>
        <h2>Message board</h2>
        <NewMessage />
        {postItems.map((item) => {
          return (
          <MessageContainer key={item._id}>
            <p><Moment fromNow ago>{item.createdAt}</Moment> ago:</p>
            <MessageDiv>
              <p>"{item.message}"</p>
            </MessageDiv>
          </MessageContainer>
        )})}
      </FeedSection>
    </>
  )
}

export default Feed

const FeedSection = styled.section`
  padding: 20px;
  box-sizing: border-box;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px #EA9A66 solid;

  h2 {
    font-family: 'Shadows Into Light', cursive;
    font-size: 25px;
    color: black;
    margin-bottom: 10px;
  }
  
  @media (min-width: 668px) and (max-width: 1024px) {
    padding: 50px;
  }
  @media (min-width: 1025px){ 
    padding: 50px;
  }
`

const MessageContainer = styled.div`
  width: 100%;
  margin-bottom: 0px;
  margin-top: 10px;
`

const MessageDiv = styled.div`
  background-color: #FFEEE3;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`

const ClonedButton = styled(Button)`
  background-color: transparent;
  border: solid 1px blue;
  color: black;
  position: absolute;
  top: 1vh;
  right: 5vw;
`
