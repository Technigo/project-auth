import React, {useEffect} from "react";
import { useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_URL } from "utils/utils";
import thoughts from "reducers/thoughts";
import user from 'reducers/user';
// import BackgroundImg from "../image/wp5393764-retro-neon-wallpapers.png";


const Main = () => {
    const accessToken = useSelector((store) => store.user.accessToken);
    const secretMessage = useSelector((store) => store.user.secretMessage);
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
            navigate("/login");
        }
    }, [accessToken]);

    useEffect(() => {
        if (accessToken) {
          const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: accessToken,
            },
          };
    
          fetch(API_URL('secret'), options)
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                batch(() => {
                  dispatch(user.actions.setSecretMessage(data.secretMessage));
                  dispatch(user.actions.setError(null));
                });
              } else {
                dispatch(user.actions.setError(data.response));
              }
            });
        }
      }, [accessToken, dispatch]);

    return (

        <><div className="main-wrapper">
            {/* <div
     className="background"
     style={{
       backgroundImage: `url(${process.env.PUBLIC_URL + '/wp5393764-retro-neon-wallpapers.png'})`
     }}> */}
            <h1 className="Welcome">Welcome to your page {username}</h1>
            <h1 className="header">{secretMessage}</h1>
            <iframe src="https://giphy.com/embed/1l25XeKOh1YIYcyhbr" width="480" height="270" frameBorder="0" allowFullScreen></iframe>
            <p><a href="https://giphy.com/gifs/studiosoriginals-dirty-mind-trying-not-to-laugh-1l25XeKOh1YIYcyhbr"></a></p>
        
            {/* </div> */}
            {/* <img src={BackgroundImg } /> */}
        </div><button className="button-52" onClick={logout}>
                Log out
            </button></>
    )
};

export default Main;

