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
            store.username = action.payload
        },
        setAccessToken: (store, action) => {
            store.accessToken = action.payload
        },
        setError: (store, action) => {
            store.error = action.payload
        },
        logOut: (store, action) => {
            store.username = null
            store.accessToken = null
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
        .then(res => res.json())
        .then(data => {
            console.log(data.error)
            if (data.success) {
                
                batch(() => {
                    dispatch(credentials.actions.setAccessToken(data.accessToken))
                    dispatch(credentials.actions.setUsername(data.username))
                    dispatch(credentials.actions.setError(null))
                })
            } else {
                dispatch(credentials.actions.setError(data))
            }
        })
        .catch()
            
            
            
        
    }
}

export default credentials



/*.then(res => {
    if (!res.ok) {
        dispatch(credentials.actions.setError(res.status))
        throw Error(res.statusText)
    } else {
        return res.json()
    }
})
.then(items => batch(() => {
    dispatch(credentials.actions.setAccessToken(items.accessToken))
    dispatch(credentials.actions.setUsername(items.username))
}))*/