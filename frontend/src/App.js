import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from "@reduxjs/toolkit"

import { user } from './reducers/user'
import { Login } from './components/Login'

const reducer = combineReducers({ user: user.reducer })
const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
          <Login />
    </Provider>
  )
}

/*______ TO-DO 

- clean dispatches!
- When I click reveal secret again, the message disapears
- When sign up the name does not shown in Welcome - how to solve this? (useEffect??)
- LocalStorage to save once logged in. Clear when logged out
- Split up card? 
- Different error messages depending on whats wrong when signing up 
    - Name already exist
    - Email does not match requirements
    - Password does not match requirements
- Deploy to Heruko and Netlify 
- Write ReadMe 
*/

// import React from 'react'
// import { Provider } from 'react-redux'
// import { configureStore, combineReducers } from "@reduxjs/toolkit"
// import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import { user } from './reducers/user'
// import { Login } from './components/Login'
// import { Profile } from './components/Profile'

// const reducer = combineReducers({ user: user.reducer })
// const store = configureStore({ reducer })

// export const App = () => {
//   return (
//     <BrowserRouter>
//     <Provider store={store}>
//       <Switch>
//         <Route exact path="/">
//           <Login />
//         </Route>
//         <Route exact path="/profile">
//           <Profile />
//         </Route>
//       </Switch>
//     </Provider>
//   </BrowserRouter>
//   )
// }
