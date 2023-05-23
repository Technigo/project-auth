import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: null,
    password: null,
    accessToken: null
  }
  export const userStore = createSlice({
    name: 'userStore',
    initialState,
  
    reducers: {
      setUsername: (store, action) => {
        store.username = action.payload
      },
    
      logout: (store) => {
        console.log('Logging out...');
        store.username = null;
        store.accessToken = null;
      }
    }
  })
  
  export const registerUser = () => {
    return (dispatch, getState) => {
      // dispatch(loading.actions.setLoading(true))
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: getState().userStore.username, password: getState().userStore.password })
      }
  
      fetch(startURL, options)
        .then((response) => response.json())
        .then((data) => {
          console.log('data', data)
          dispatch(userStore.actions.setcurrentGameState(data))
          dispatch(loading.actions.setLoading(false));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  
  export const continueGame = (direction) => {
    return (dispatch, getState) => {
      dispatch(loading.actions.setLoading(true))
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: getState().userStore.username,
          type: 'move',
          direction
        })
      }
  
      fetch(actionURL, options)
        .then((respons) => respons.json())
        .then((data) => {
          dispatch(userStore.actions.setcurrentGameState(data));
          dispatch(userStore.actions.setPlayerHistory(direction))
          dispatch(loading.actions.setLoading(false));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  