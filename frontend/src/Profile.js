import React, { useState, useEffect } from 'react'

const URL = 'https://harry-potter-auth.herokuapp.com/secrets'
// const URL = 'http://localhost:9000/secrets'

// Include loggedInUser as a parameter to PRofile
export const Profile = () => {
    const accessToken = localStorage.getItem('accessToken')
    // this is now set from the login process
    const [secretMessage, setSecretMessage] = useState('')
    const [user, setUser] = useState('')

    useEffect((props) => {
        const fetchUserData = () => {
            return fetch(URL, {
                method: 'GET',
                headers: { Authorization: accessToken }
            })
                .then(res => res.json())
                .then(json => {
                    setUser(json.user)
                    setSecretMessage(json.secret)
                })
                .catch(err => {
                    console.log('error', err)
                })
        }
        fetchUserData()
    }, [])
    return (
        <div>
            <h1>{`Hello ${user}`}</h1>
            <h6>{secretMessage}</h6>
        </div>
    )
}
export default Profile