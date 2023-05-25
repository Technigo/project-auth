import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "utils/urls"; 
import { loading } from "./loading"; 

export const user = createSlice({
    name:"user",
    initialState:{
        username:"",
        userId:null,
        // email:"",
        // password:null,
        badges:[],
        avatar:"",
        accessToken:null,
        error:null,
        mode:"login"
    },
    reducers:{
        setUsername:(store, action) =>{
            store.username = action.payload
        },
        // setEmail:(store, action) =>{
        //     store.email = action.payload
        // },
        //  setPassword:(store, action) =>{
        //     store.password = action.payload
        // },
        setUserId:(store, action) =>{
            store.userId = action.payload
        },
        setAccessToken:(store, action) =>{
            store.accessToken = action.payload
        },
        setError:(store, action) =>{
            store.error = action.payload
        },
        setMode:(store, action )=>{
            store.mode = action.payload
        }
    }
});

// POST: register a user

export const registerUser = (username, email, password) => {
  return (dispatch) => {
    dispatch(loading.actions.setLoading(true))
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    }
    fetch(API_URL('register'), options)
      .then((response) => response.json())
      .then(data => {
         if(data.success) {
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setUsername(data.response.username));
            // dispatch(user.actions.setEmail(data.response.email));
            // dispatch(user.actions.setPassword(data.response.password));
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setError(null))
            console.log(data)
         } else {
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setUsername(null));
            // dispatch(user.actions.setEmail(null));
            // dispatch(user.actions.setPassword(null));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setError(data.response.message))
            console.log(data)
         }
      })
      .finally(() => dispatch(loading.actions.setLoading(false)))
  };
};

// POST: login user
export const loginUser = ( email, password) => {
  return (dispatch) => {
    dispatch(loading.actions.setLoading(true))
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'accessToken'
      },
      body: JSON.stringify({ email, password })
    }
    fetch(API_URL('login'), options)
      .then((response) => response.json())
      .then(data => {
         if(data.success) {
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setUsername(data.response.username));
            // dispatch(user.actions.setEmail(data.response.email));
            // dispatch(user.actions.setPassword(data.response.password));
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setError(null))
            console.log(data)
         } else {
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setUsername(null));
            // dispatch(user.actions.setEmail(null));
            // dispatch(user.actions.setPassword(null));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setError(data.response.message))
            console.log(data)
         }
      })
      .finally(() => dispatch(loading.actions.setLoading(false)))
  };
};