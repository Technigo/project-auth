import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import user from 'reducers/user';
import thoughts from 'reducers/thoughts';
import { API_URL } from 'utils/urls';

const Main = () => {
    const thoughtsItems = useSelector((store) => store.thoughts.items);
    const accessToken = useSelector((store) => store.user.accessToken);
    const username = useSelector((store) => store.user.username);
    const mode = useSelector((store) => store.user.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken, navigate])

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: accessToken
            }
        } 
        fetch(API_URL(mode), options) 
            .then((res) => res.json())
            .then((data) => {
                if(data.success) { //kollar datan och om success är true (från backend)
                    dispatch(thoughts.actions.setItems(data.response));
                    dispatch(thoughts.actions.setError(null))
                } else {
                    dispatch(thoughts.actions.setItems([]));
                    dispatch(thoughts.actions.setError(data.response))
                }
            })
    }, [accessToken, dispatch])

    // I put in thoughts in postman to the database, but they dont display in the frontend

      const logOut = () => {
        batch(() => {
          dispatch(user.actions.setUserName(null));
          dispatch(user.actions.setAccessToken(null));
        });
      };

    return (
        <>
        <div>
            <h2>{mode === "register" 
            ? "Welcome to the football page "
            : "Welcome back to the football page "}
            {username}!</h2>
           {/*  {thoughtsItems.map((item) => {
                return <p key={item._id}>{item.message}</p>
            })} */}
             <Link to="/" onClick={logOut}>
                Log out
            </Link>
            </div>
        </>
    )
}

export default Main