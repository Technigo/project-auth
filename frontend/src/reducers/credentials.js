import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const credentials = createSlice({
    name: 'credentials',
    initialState: {
        message: 'start',
        accessToken: ''
    },
    reducers: {
        setData: (store, action) => {
            console.log("data was set ^^")
            store.message = action.payload.message
        },
        setToken: (store, action) => {
            console.log(action)
            console.log("funkar denna")
            console.log(action.payload)
            store.accessToken = action.payload.accessToken
            console.log(store.accessToken)
        }
    }
})

export const generateText = () => {
    //const dispatch = useDispatch()
    return (dispatch) => {
        fetch('https://week-20-project-auth-api.herokuapp.com/thoughts')
        .then(res => res.json())
        .then(items => dispatch(credentials.actions.setData(items)))
    }
}

export const signIn = (username, password) => {
    return (dispatch) => {
        fetch('https://week-20-project-auth-api.herokuapp.com/signin', {
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
        .then(items => dispatch(credentials.actions.setToken(items)))
        .catch(error => console.log(error))
    }
}

export const signUp = (username, password) => {
    return (dispatch) => {
        fetch('https://week-20-project-auth-api.herokuapp.com/signup', {
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
        .then(items => dispatch(credentials.actions.setToken(items)))
        .catch(error => console.log(error))
    }
}

export default credentials