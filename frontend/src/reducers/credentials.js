import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const credentials = createSlice({
    name: 'credentials',
    initialState: {
        message: 'start'
    },
    reducers: {
        setData: (store, action) => {
            console.log("data was set ^^")
            store.message = action.payload.message
        }
    }
})

export const generateText = () => {
    //const dispatch = useDispatch()
    return (dispatch) => {
        fetch('https://week-20-project-auth-api.herokuapp.com/thoughts')
        .then(res => res.json)
        .then(items => dispatch(credentials.actions.setData(items)))
    }
}

export default credentials