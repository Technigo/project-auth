
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: {
    accessToken: localStorage.accessToken || null,
    //userId: 0,
    name: localStorage.userName || "",
    secretMessage: null,
    errorMessage: null,
  },
};

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload
      //console.log(`Access Token: ${accessToken}`)
      state.login.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
    },
    // setUserId: (state, action) => {
    //   const { userId } = action.payload
    //   //console.log(`User Id: ${userId}`)
    //   state.login.userId = userId
    // },
    setUserName: (state, action) => {
      const { userName } = action.payload
      //console.log(`User name: ${userName}`)
      state.login.name = userName
      localStorage.setItem('userName', userName);
    },
    setSecretMessage: (state, action) => {
      const { secretMessage } = action.payload
      //console.log(`Secret Message: ${secretMessage}`)
      state.login.secretMessage = secretMessage
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload
      console.log(`Error Message: ${errorMessage}`)
      state.login.errorMessage = errorMessage
    },
    // setLoggedIn: state => {
    //   state.isLoggedIn = true;
    // },
    
  },
});

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
        }
        // if (!res.ok) {
        //   if (!name.unique) {
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
        );
        //dispatch(user.actions.setUserId({ userId: json.userId }))
        dispatch(user.actions.setUserName({ userName: json.name }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err.toString() }))
      });
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
        if (res.ok /* if 200, 201, 204 */) {
          return res.json();
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
        );
        //dispatch(user.actions.setUserId({ userId: json.userId }))
        dispatch(user.actions.setUserName({ userName: json.userName }))
      })
      .catch((err) => {
        dispatch(logout());
        dispatch(user.actions.setErrorMessage({ errorMessage: err.toString() }))
      });
  };
};

//_______Secret message
export const getSecretMessage = () => {
  const USERS_URL = 'http://localhost:8080/users'
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    const userId = getState().user.login.userId
    // Include userId in the path
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
      // SUCCESS: Do something with the information we got back
      .then((json) => {
        dispatch(
          // can we remove secretMessage:?
          user.actions.setSecretMessage({ secretMessage: JSON.stringify(json) })
        );
      })
      .catch((err) => {

        dispatch(user.actions.setErrorMessage({ errorMessage: err.toString() }))
      }) //401
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(user.actions.setSecretMessage({ secretMessage: null }))
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    //dispatch(user.actions.setUserId({ userId: 0 }))
    dispatch(user.actions.setUserName({ name: null }))
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
  }
}

// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   login: {
//     accessToken: null,
//     userId: 0,
//     name: null,
//     secretMessage: null,
//     errorMessage: null,
//   },
// };

// export const user = createSlice({
//   name: 'user',
//   initialState: initialState,
//   reducers: {
//     setAccessToken: (state, action) => {
//       const { accessToken } = action.payload
//       //console.log(`Access Token: ${accessToken}`)
//       state.login.accessToken = accessToken
//     },
//     setUserId: (state, action) => {
//       const { userId } = action.payload
//       //console.log(`User Id: ${userId}`)
//       state.login.userId = userId
//     },
//     setUserName: (state, action) => {
//       const { userName } = action.payload
//       //console.log(`User name: ${userName}`)
//       state.login.name = userName
//     },
//     setSecretMessage: (state, action) => {
//       const { secretMessage } = action.payload
//       //console.log(`Secret Message: ${secretMessage}`)
//       state.login.secretMessage = secretMessage
//     },
//     setErrorMessage: (state, action) => {
//       const { errorMessage } = action.payload
//       console.log(`Error Message: ${errorMessage}`)
//       state.login.errorMessage = errorMessage
//     },
//     // setLoggedIn: state => {
//     //   state.isLoggedIn = true;
//     // },

//   },
// });

// //____________THUNKS____________//
// //_______Sign up
// export const signUp = (name, email, password) => {
//   const SIGNUP_URL = "http://localhost:8080/signup"
//   return (dispatch) => {
//     fetch(SIGNUP_URL, {
//       method: 'POST',
//       body: JSON.stringify({ name, email, password }),
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then((res) => {
//         //Failed
//         if (!res.ok) {
//           throw 'Could not create account.'
//         }
//         // if (!res.ok) {
//         //   if (!name.unique) {
//         //     throw 'user already exist'
//         //   } else if (!email.ok) {
//         //     throw 'password does not match requirements'
//         //   } else {
//         //     throw 'something went wrong'
//         //   }
//         // }
//         //Success
//         return res.json()
//       })
//       .then((json) => {
//         // Save the login info
//         dispatch(
//           user.actions.setAccessToken({
//             accessToken: json.accessToken,
//           })
//         );
//         dispatch(user.actions.setUserId({ userId: json.userId }))
//         dispatch(user.actions.setUserName({ userName: json.name }))
//       })
//       .catch((err) => {
//         dispatch(user.actions.setErrorMessage({ errorMessage: err }))
//       });
//   }
// }

// //_______Login
// export const login = (name, email, password) => {
//   const LOGIN_URL = 'http://localhost:8080/login'
//   return (dispatch) => {
//     fetch(LOGIN_URL, {
//       method: 'POST',
//       body: JSON.stringify({ name, email, password }),
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then((res) => {
//         //Success
//         if (res.ok /* if 200, 201, 204 */) {
//           return res.json();
//         }

//         // Not OK - failed
//         throw 'Unable to sign in. Please check your username and password are correct'
//       })
//       .then((json) => {
//         // Save the login info
//         dispatch(
//           user.actions.setAccessToken({
//             accessToken: json.accessToken,
//           })
//         );
//         dispatch(user.actions.setUserId({ userId: json.userId }))
//         dispatch(user.actions.setUserName({ userName: json.userName }))
//       })
//       .catch((err) => {
//         dispatch(logout());
//         dispatch(user.actions.setErrorMessage({ errorMessage: err }))
//       });
//   };
// };

// //_______Secret message
// export const getSecretMessage = () => {
//   const USERS_URL = 'http://localhost:8080/users'
//   return (dispatch, getState) => {
//     const accessToken = getState().user.login.accessToken
//     const userId = getState().user.login.userId
//     // Include userId in the path
//     fetch(`${USERS_URL}/${userId}/secret`, {
//       method: 'GET',
//       // Include the accessToken to get the protected endpoint
//       headers: { Authorization: accessToken },
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json()
//         }
//         throw 'Could not get information. Make sure you are logged in and try again.'
//       })
//       // SUCCESS: Do something with the information we got back
//       .then((json) => {
//         dispatch(
//           // can we remove secretMessage:?
//           user.actions.setSecretMessage({ secretMessage: JSON.stringify(json) })
//         );
//       })
//       .catch((err) => {

//         dispatch(user.actions.setErrorMessage({ errorMessage: err }))
//       }) //401
//   };
// };

// export const logout = () => {
//   return (dispatch) => {
//     dispatch(user.actions.setSecretMessage({ secretMessage: null }))
//     dispatch(user.actions.setErrorMessage({ errorMessage: null }))
//     dispatch(user.actions.setAccessToken({ accessToken: null }))
//     dispatch(user.actions.setUserId({ userId: 0 }))
//     dispatch(user.actions.setUserName({ name: null }))
//   };
// };
