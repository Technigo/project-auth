import React, { useState, useEffect } from 'react'

const URL = 'http://localhost:8080/users'

export const Profile = ({ loggedInUser }) => {
   const[userId, setUserId] = useState(loggedInuser.userID)
   const[accessToken, setAccessToken] = useState(loggedInuser.accessToken)
   
   const changeName = (userObject) => {
        document.getElementById('name').innerHTML = userObject.name 
   }

    useEffect(() => {
        console.log(loggedInuser)
        // Never do this unless you messed up somwhere else
        //loggedInuser = loggedInuser.loggedInuser
        setUserId(loggedInuser._id)
        setAccessToken(loggedInuser.accessToken)
        fetch(`${URL}/${userId}`, {
            method: 'GET',
            headers: {'Authorization':accessToken}
        })
            .then(res => res.json())
            .then(json => changeName(json))
            .catch(err => console.log('error:', err))
    
    })

return (
    <div>Profile <div id="name"></div></div>
)
}