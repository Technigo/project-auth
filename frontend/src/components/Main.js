import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { API_URL } from "utils/urls";
import styled from 'styled-components';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

export const Main = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    // const username = useSelector(store => store.user.username);
    const navigate = useNavigate();
    const [quote, setQuote] = useState([])
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
        fetch(API_URL("secret"), options)
            .then(res => res.json())
            .then(data => setQuote(data.body))
            .catch(error => console.log(error))
    }, [])

    const onLogoutClick = () => {
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setError(null));
    }
    return (
        <>
        <TextSquare>
        <Text>
        <h2>Today's Cheesy Quote</h2>
        {quote.map(item => {
        return (<p key={item._id}>{item.quote}</p>)})}
        <Monster>
         <Player
          autoplay
          loop
          src="https://assets3.lottiefiles.com/packages/lf20_borkvxlu.json"
          style={{ height: '100px', width: '100px', }}>
          <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
          </Player>
          </Monster>
        <button type="button" onClick={onLogoutClick}>Log Out</button>
        </Text>
        </TextSquare>
        
        </>
    ) 
};

const TextSquare = styled.div`
margin-top: 30px;
height: 700px;
position: relative;
background-color: pink;
font-family: 'Montserrat', sans-serif;
--mask:
    radial-gradient(65.38px at 50% 91.20px,#000 99%,#0000 101%) calc(50% - 76px) 0/152px 51% repeat-x,
    radial-gradient(65.38px at 50% -53.2px,#0000 99%,#000 101%) 50% 38px/152px calc(51% - 38px) repeat-x,
    radial-gradient(65.38px at 50% calc(100% - 91.20px),#000 99%,#0000 101%) calc(50% - 76px) 100%/152px 51% repeat-x,
    radial-gradient(65.38px at 50% calc(100% + 53.20px),#0000 99%,#000 101%) 50% calc(100% - 38px)/152px calc(51% - 38px) repeat-x;
  -webkit-mask: var(--mask);
          mask: var(--mask);

`
const Text = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-top: 200px;
h2 {
font-size: 20px;
color: black;
align-self: center;
}
p {
    margin-bottom: 80px;
    width: 370px;
    height: 50px;
    text-align:center;
}
button {
    width: 230px;
    height: 40px;
    color: white;
    font-size: 18px;
    background-color: black;
    align-self: center;
    border-radius: 10px;
    border-style: none;
    margin-top: 20px;
    font-family: 'Montserrat', sans-serif;
    z-index: 1;
}
@media (max-width: 375px){
 p{
  width: 290px;
 }
h2 {
  font-size: 20px;
   }
}
`
const Monster = styled.div`
position: absolute;
margin: 0 55px -140px 0;
z-index: 0;

@media (max-width: 375px){
    margin: 0 55px -130px 0;
}
`