import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "utils/utils";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [mode, setMode] = useState("login")
    const dispatch = useDispatch()
    const accessToken = useSelector(store => store.user.accessToken)
    const onFormSubmit = (event) => {
        event.preventDefault()
        const options = {
            method: "POST",
            headers: {
                "contentType": "application/json"
            },
            body: JSON.stringify({username: username, password: setPassword})
        }
        fetch(API_URL(mode), options)
            .then(response => response.json())
            .then(potato => {
                if(potato.success) {
                    dispatch(user.actions.setAccessToken(potato.response.accessToken))
                    dispatch(user.actions.setUsername(potato.response.username))
                    dispatch(user.actions.setUserId(potato.response.id))
                    dispatch(user.actions.setError(null))
                } else {
                    dispatch(user.actions.setAccessToken(null))
                    dispatch(user.actions.setUsername(null))
                    dispatch(user.actions.setUserId(null))
                    dispatch(user.actions.setError(null))
                }
            })
    }

    return(
        <form>
            <label htmlFor="username">Username</label>
            <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Login