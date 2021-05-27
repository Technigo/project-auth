import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    username: null,
    accessToken: null,
    errors: null
  },
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    },
    logout: (store, action) => {
      console.log('hej')
      store.login.accessToken = null
      store.user = {}
    }
  }

})



// export const logout = () => {
//   return (dispatch) = {
//     dispatch(store.actions.setAccessToken({ accessToken: null }))
//   }
// }

// export const logout = () => {
//   return (dispatch) => {
//     dispatch(user.actions.setAccessToken({ accessToken: null }))
//   }
// }
export default user