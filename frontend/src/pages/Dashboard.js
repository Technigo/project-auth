import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InnerWrapper, Button, TextWrapper, Img } from '../assets/GlobalStyles'
import { useNavigate } from 'react-router-dom'
import user from 'reducers/user'
import Meme from '../assets/drake-meme.jpg'

export const Dashboard = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  //If user is not logged in, they get redirected
  useEffect(() => {
    if(!accessToken) {
      navigate("/")
      alert("403: Please log in")
    }
  }, [accessToken])

  // Log out button sets access token to null and redirects to startpage
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
