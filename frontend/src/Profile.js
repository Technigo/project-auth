import React, { useState, useEffect } from 'react'

// const URL = 'https://harry-potter-auth.herokuapp.com/secrets'
const URL = 'http://localhost:9000/secrets'

// Include loggedInUser as a parameter to PRofile
export const Profile = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    // userName är default user
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const fetchUserData = () => {
            fetch(URL, {
                method: 'GET',
                headers: { Authorization: accessToken }
            })
                .then(res => res.json())
                .then(json => {
                    console.log('json', json)
                    setUserName(json.username)
                })
                .catch(err => {
                    console.log('error', err)
                })
        }
        fetchUserData()
    })
    return (
        <div>
            <h1>{`Hello ${userName}`}</h1>
        </div>
    )
}
export default Profile