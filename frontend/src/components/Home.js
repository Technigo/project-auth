import React, { useEffect } from "react";
import { API_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

export const Home = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const username = useSelector((store) => store.user.username)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect( () => {
    if (!accessToken) {
        navigate("/");
    }
    }, []);
    
    useEffect(() => {

      const options = {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": accessToken
          }
      }

      fetch(API_URL("user"), options)
      .then(res => res.json())
      .then(data => {
          if(data.success) {
              dispatch(users.actions.setItems(data.response));
              dispatch(users.actions.setError(null));
          } else {
              dispatch(users.actions.setItems([]));
              dispatch(users.actions.setError(data.response));
          }
      })
}, []);
    
    return (
    <div>
        <h1>Welcome, you are now logged in!</h1>
    </div>
    )
}