import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InnerWrapper, Button, TextWrapper, Img } from '../assets/GlobalStyles'
import thoughts from 'reducers/thoughts'
import { API_URL } from 'utils/Utils'
import { useNavigate } from 'react-router-dom'
import user from 'reducers/user'
import Meme from '../assets/drake-meme.jpg'

export const Dashboard = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if(!accessToken) {
      navigate("/")
      alert("You are not logged in")
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
    fetch(API_URL("messages"), options)
    .then(res => res.json())
    .then(data => {
       if(data.success) {
         dispatch(thoughts.actions.setItems(data.response));
         dispatch(thoughts.actions.setError(null));
       } else {
         dispatch(thoughts.actions.setItems([]));
         dispatch(thoughts.actions.setError(data.response));
      }
     })
   }, []);

  return (
    <InnerWrapper>
      <TextWrapper SiteHeader>
      <h1>Dashboard</h1>
      <Button logout
            type="button"
            onClick={() => {
            dispatch(user.actions.setAccessToken(null));
            navigate("/");
            }}> 
            Log Out
        </Button>
        </TextWrapper>
        <Img src={Meme} alt="drake meme" />
      </InnerWrapper>
  )
}
