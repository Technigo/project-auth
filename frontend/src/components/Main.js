import React, { useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useHistory } from "react-router-dom"
import styled from "styled-components/macro"

import { API_URL } from "../reusable/urls"

import thoughts from "../reducers/thoughts"


const ThoughtsContainer = styled.div`
  background-color:#4838a8;
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;    
`

const ThoughtsWrapper = styled.div`
  background-color:#ffffff;
  padding:10px;
  margin:30px;
  border-radius:20px;
  
`

const Title = styled.text`
  font-size:40px;
  color:#fff;
  margin:50px 30px;
  align-text:center;
`
const Thought = styled.text`
  font-size: 20px;
  padding:40px;
`

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const thoughtsItems = useSelector(store => store.thoughts.items)
  
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push("/signin")
    }

    const options = {
      method:'GET',
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
            });
          } else {
            dispatch(thoughts.actions.setErrors(data))
          }
      });
  }, [accessToken, dispatch, history]) // I added the second arg because of an error suggesting that

  return (
    <ThoughtsContainer>
     <Title>Happy Thoughts for your daily life</Title>
        {thoughtsItems.map(thought => (
          <ThoughtsWrapper key={thought._id}>
            <Thought>
              {thought.message}
            </Thought>
          </ThoughtsWrapper>
        ))}
    </ThoughtsContainer>
  )  
};

export default Main
