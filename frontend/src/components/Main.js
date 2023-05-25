import React, { useEffect } from "react";
// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Main = () => {

    const scoreItems = useSelector((store) => store.score.items);
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username);
    const navigate = useNavigate();
    useEffect(() => {
        if(!accessToken){
            navigate("/login")
        }
    },[accessToken]);
    
    // useEffect(() => {
    //     const options = {
    //         method:"GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": accessToken
    //         }
    //     }
    //     fetch(API_URL("scores"), options)
    //         .then(res => res.json())
    //         .then(data => {
    //            if(data.success) {
    //             dispatch(scores.actions.setError(null));
    //             dispatch(scores.actions.setItems(data.response));
    //            } else {
    //             dispatch(scores.actions.setError(response));
    //             dispatch(scores.actions.setItems([]));
    //            }
    //         })
    // })

    const onLogoutButtonClick = () => {
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setError(null))
    }    
     return(
    <>
      <button type="button" onClick={onLogoutButtonClick}>LOGOUT</button>
        {username ? (<h2>THESE ARE THE THOUGHT OF {username.toUpperCase()}</h2>): ""}
        {scoreItems.map(item => {
            return(<p key={item._id}>Email registered {item.score}</p>)
            })}
    </>
     )
};

export default Main