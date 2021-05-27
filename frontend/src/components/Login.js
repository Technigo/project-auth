import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { API_URL } from '../reusable/urls'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mode, setMode] = useState(null)
    
    const accessToken= useSelector(store => store.user.accessToken)    
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        //redirect user to '/path    
    }, [accessToken])

    const onFormSubmit = (e) => {
        e.preventDefault()

        const options = {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, password})
        }
       
    }


    return (
        <form onSubmit={onFormSubmit}>
            <input
             type="text" 
             value={username} 
             onChange={(e) => setUsername(e.target.value)}
             />
            <input
               type="password"
               value={username}
               onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={()}>Sign in</button>
            <button>Sign up</button>
        </form>
    )
}

export default Login