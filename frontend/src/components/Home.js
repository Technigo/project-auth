import React, { useEffect } from "react";
import { API_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate, Link } from "react-router-dom";
import user from "./reducers/user";

export const Home = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  //const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [])
    
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
              dispatch(user.actions.setItems(data.response));
              dispatch(user.actions.setError(null));
          } else {
              dispatch(user.actions.setItems([]));
              dispatch(user.actions.setError(data.response));
          }
      })
    }, []);
    
    return (
    <div>
        <h1>Welcome, you are now logged in!</h1>
    </div>
    )
}