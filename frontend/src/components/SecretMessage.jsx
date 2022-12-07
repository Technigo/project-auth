import React, { useEffect }from "react";
import { useSelector, batch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Buttons } from './Styles/Form.Styles'
import { SecretContainer } from "./Styles/SecretMessage.Styles";
import { Player } from '@lottiefiles/react-lottie-player'



import user from 'reducers/user';

export const SecretMessage = () => {
    const accessToken = useSelector((store) => store.user.accessToken);
    const username = useSelector((store) => store.user.username);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        batch(() => {
          dispatch(user.actions.setUserName(null));
          dispatch(user.actions.setAccessToken(null));
        });
      };

    useEffect(()=> {
        if(!accessToken) {
            navigate("/");
        }
    }, [accessToken]); 

    return (
    <SecretContainer>
        <h1>Welcome in, {username}.</h1>
        <h3>We just wanted to remind you <br/>- you are beautiful!</h3>
        <Player
          src="https://assets1.lottiefiles.com/packages/lf20_imcvpf0j.json"
          style={{ width: '120px', height: '120px' }}
          loop
          autoplay
          speed={1} /> 
      <Buttons style={{ width: '50%' }} type="button" onClick={logout}>Log out</Buttons>
    </SecretContainer>
    )
};
