import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user') ? { 
  id: JSON.parse(localStorage.getItem('user')).id,
  username: JSON.parse(localStorage.getItem('user')).username,
  email: JSON.parse(localStorage.getItem('user')).email,
  fullName: JSON.parse(localStorage.getItem('user')).fullName,
  age: JSON.parse(localStorage.getItem('user')).age,
  location: JSON.parse(localStorage.getItem('user')).location,
  desc: JSON.parse(localStorage.getItem('user')).desc,
  accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
  errors: null, 
  signup: false
}
:
{
  id: null,
  username: null,
  email: null,
  fullName: null,
  age: null,
  location: null,
  desc: null,
  accessToken: null,
  errors: null, 
  signup: false
}

export const account = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setID: (store, action) => {
      store.id = action.payload
    },

    setUsername: (store, action) => {
      store.username = action.payload
    },

    setEmail: (store, action) => {
      store.email = action.payload
    },

    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },

    setProfileInfo: (store, action) => {
      store.fullName = action.payload.fullName
      store.age = action.payload.age
      store.location = action.payload.location
      store.desc = action.payload.description
    },

    setErrors: (store, action) => {
      store.errors = action.payload
    },

    showSignupForm: (store, action) => {
      store.signup = action.payload
    },
    
    logIn: (store, action) => {
      store.logedIn = action.payload
    },

    logOut: (store, action) => {
      store.accessToken = null
      store.id = null
      store.username = null
      store.email = null
    }
  }
})