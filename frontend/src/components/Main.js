import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import user from 'reducers/user';
import thoughts from 'reducers/thoughts';
import { API_URL } from 'utils/urls';

const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items);
    const accessToken = useSelector((store) => store.user.accessToken);
    // maybe mode here too
    const dispatch = useDispatch();
    const navigate =useNavigate();
    /* const mode = useSelector((store) => store.user.mode); */

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
                "Authorization": accessToken
            }
        } 
        fetch(API_URL("thoughts"), options) 
            .then(res => res.json())
            .then(data => {
                if(data.success) { //kollar datan och om success är true (från backend)
                    dispatch(thoughts.actions.setItems(data.response));
                    dispatch(thoughts.actions.setError(null))
                } else {
                    dispatch(thoughts.actions.setItems([]));
                    dispatch(thoughts.actions.setError(data.response))
                }
            })
    }, [])

    // I put in thoughts in postman to the database, but they dont display in the frontend

      const logOut = () => {
        batch(() => {
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setAccessToken(null));
          /* navigate("/login") */

    
          //localStorage.removeItem('user')
        });
      };

    return (
        <>
           {/*  <Link to="/login">GO TO LOGIN</Link>  */}{/* I think Daniel wrote this, but i feel unsure about the link to log in here */}
            <h2>This is the Main</h2>
            {/* {thoughtItems.map((item) => {
                return <p key={item._id}>{item.message}</p>
            })} */}
             <Link to="/" onClick={logOut}>
          Log out
        </Link>
        </>
    )
}

export default Main