import { createSlice } from '@reduxjs/toolkit'
import { useDispatch, batch } from 'react-redux'
import { API_URL } from '../reusables/urls'

const credentials = createSlice({
    name: 'credentials',
    initialState: {
        username: null,
        accessToken: null,
        error: null
    },
    reducers: {
        setUsername: (store, action) => {
            console.log("name was set ^^")
            store.username = action.payload
        },
        setAccessToken: (store, action) => {
            console.log(action)
            console.log("funkar denna")
            console.log(action.payload)
            store.accessToken = action.payload
            console.log(store.accessToken)
        },
        setError: (store, action) => {
            store.error = action.payload
        }
    }
})

// export const signIn = (username, password) => {
//     return (dispatch) => {
//         fetch('https://week-20-project-auth-api.herokuapp.com/signin', {
//             method: 'POST',
//             headers: {
//                 'Content-type' : 'application/json'
//             },
//             body: JSON.stringify({ username, password })
//         })
//         .then(res => {
//             if (!res.ok) {
//                 throw Error(res.statusText)
//             } else {
//                 return res.json()
//             }
//         })
//         .then(items => batch(() => {
//             dispatch(credentials.actions.setAccessToken(items))
//             dispatch(credentials.actions.setUsername(items))
//         }))
//         .catch(error => console.log(error))
//     }
// }

export const authenticate = (username, password, mode) => {
    return (dispatch) => {
        fetch(API_URL(mode), {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => {
            if (!res.ok) {
                throw Error(res.statusText)
            } else {
                return res.json()
            }
        })
        .then(items => batch(() => {
            dispatch(credentials.actions.setAccessToken(items))
            dispatch(credentials.actions.setUsername(items))
        }))
        .catch(error => console.log(error))
    }
}

export default credentials