import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { auth } from "../reducers/auth"
import { BeatLoader } from 'react-spinners'

export const Secret = () => {
    const [secrets, setSecrets] = useState([])
    const [status, setStatus] = useState()
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const token = useSelector(store => store.auth.accessToken);

    const logout = () => {
        dispatch(auth.actions.logout())
    }

    useEffect(() => {
        fetch('http://localhost:8080/secrets', {
            headers: {
                "Authorization": token
            }
        })
            .then(res => {
                setStatus(res.status)
                return res.json()
            })
            .then(json => {
                setSecrets(json.secret)
                setLoading(false)
            })
    }, [token])

    if (loading) {
        return <main><BeatLoader color='#fff' /></main>
    }

    if (loading === false && status !== 200) {
        return (
            <div>
                <h1>Unauthorized</h1>
            </div>
        )
    }
    return (
        <main>

            <h1>Secret page!</h1>
            {secrets}

            <Link to='/'><button type='button' onClick={logout}>Logout</button></Link>
        </main>
    )
}
