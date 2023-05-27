import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import surfPosts from "reducers/surfPosts";
import { API_URL } from "utils/urls";
import styled from "styled-components/macro";
import Form from "./Form";

const Main = () => {
  // const surfPostsItems = useSelector((store) => store.surfPosts.items);
  const dispatch = useDispatch();
  const accessToken = useSelector(store => store.user.accessToken);
  const username = useSelector(store => store.user.username);
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      }
    }
    fetch(API_URL("surfposts"), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(surfPosts.actions.setError(null));
          dispatch(surfPosts.actions.setItems(data.response));
          console.log(data.response)
        } else {
          dispatch(surfPosts.actions.setError(data.response));
          dispatch(surfPosts.actions.setItems([]));
        }
      });
  }, [accessToken, dispatch])

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(surfPosts.actions.setItems([]));
  };

  return (
    <StyledMainWrapper>
      <InnerWrapper>
        <GreetingText> Hi {username}! You are now logged in.</GreetingText>
        <LogoutButton type="button" onClick={onLogoutButtonClick}>Log out</LogoutButton>
        <Form />
        <PostsWrapper>
          {useSelector((store) => store.surfPosts.items).map((item) => {
            return (
              <SinglePostWrapper key={item.id}>
                <Headline>{item.headline}</Headline>
                <Location>{item.location}</Location>
                <Message>{item.message}</Message>
                <p>{new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                <p>{item.likes}</p>
              </SinglePostWrapper>
            )
          })}
        </PostsWrapper>
      </InnerWrapper>
    </StyledMainWrapper>
  )
}

const StyledMainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`
const InnerWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 80vw;
  align-items: center;
  gap: 15px;

  @media (min-width: 667px){
    width: 50vw;
  }
  @media (min-width: 1024px){
    width: 50vw;
  }
  `
const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const SinglePostWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`

const GreetingText = styled.h2`
font-size: 2.4rem;
color: #257ca3;
text-align: center;
font-family: Caveat;
font-weight: 500;
margin-bottom: 8px;
`

const LogoutButton = styled.button`
  border: 2px solid #257ca3;
  color: white;
  background-color: #257ca3;
  width: 80px;
  border-radius: 20px;
  font-family: Urbanist;
  cursor: pointer;
  margin-bottom: 16px;

  &:hover {
    border: 2px solid black;
    background-color: black;
    color: white;
  }
`

const Headline = styled.p`
  font-family: Caveat;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #257ca3;
`

const Location = styled.p`
  font-weight: 400;
`

const Message = styled.p`
  font-weight: 300;
`

export default Main;