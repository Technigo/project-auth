import React, {useEffect} from "react";
import { useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_URL } from "utils/utils";
import thoughts from "reducers/thoughts";
import user from 'reducers/user';


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

        <>
            <Link to="/login"> LINK TO /login</Link>
            <h1 className="Welcome">Welcome to your page {username}</h1>
            <h1 className="header">{secretMessage}</h1>
            {/* {thoughtItems.map((item) => {
                return <div key = {item._id}>{item.message}</div>
            })} */}
             <button className="button" onClick={logout}>
            Log out
             </button>
        </>
    )
};

export default Main;