import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: {
    accessToken: localStorage.accessToken || null,
    userName: localStorage.userName || "",
    secretMessage: null,
    errorMessage: null,
  },
}

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload
      state.login.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
    },
    setUserName: (state, action) => {
      const { userName } = action.payload
      state.login.userName = userName
      localStorage.setItem('userName', userName)
    },
    setSecretMessage: (state, action) => {
      const { secretMessage } = action.payload
      state.login.secretMessage = secretMessage
    },
    // hideSecretMessage: (state, action) => {
    //   const { hideMessage } = state.login.secretMessage
    //   if(hideMessage) {
    //     hideMessage.null = !hideMessage
    //   }
    // },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload
      state.login.errorMessage = errorMessage
    },
  },
})

//____________THUNKS____________//
//_______Sign up
export const signUp = (name, email, password) => {
  const SIGNUP_URL = "http://localhost:8080/signup"
  return (dispatch) => {
    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        //Failed
        if (!res.ok) {
          throw new Error('Could not create account')
          //throw new Error(res.message)
        }
        // if (!res.ok) {
        //   if (email === ) {
        //     throw 'user already exist'
        //   } else if (!email.ok) {
        //     throw 'password does not match requirements'
        //   } else {
        //     throw 'something went wrong'
        //   }
        // }
        
        //Success
        return res.json()
      })
      .then((json) => {
        // Save the login info
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken,
          })
        )
        dispatch(user.actions.setUserName({ userName: json.userName }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err.toString() }))
      })
  }
}

//_______Login
export const login = (name, email, password) => {
  const LOGIN_URL = 'http://localhost:8080/login'
  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        //Success
        if (res.ok) {
          return res.json()
        }
        // Not OK - failed
        throw new Error('Unable to sign in. Please check your username and password are correct')
      })
      .then((json) => {
        // Save the login info
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken,
          })
        )
        dispatch(user.actions.setUserName({ userName: json.userName }))
      })
      .catch((err) => {
        dispatch(logout())
        dispatch(user.actions.setErrorMessage({ errorMessage: err.toString() }))
      })
  }
}

//_______Secret message
export const getSecretMessage = () => {
  const USERS_URL = 'http://localhost:8080/users'
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    const userId = getState().user.login.userId
    fetch(`${USERS_URL}/${userId}/secret`, {
      method: 'GET',
      // Include the accessToken to get the protected endpoint
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not get information. Make sure you are logged in and try again.')
      })
      .then((json) => {
        dispatch(
          user.actions.setSecretMessage({ secretMessage: JSON.stringify(json).slice(1,-1) })
        )
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err.toString() }))
      }) 
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(user.actions.setSecretMessage({ secretMessage: null }))
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setUserName({ userName: null }))
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userName')
  }
}