 import React, { useState, useEffect } from 'react'

const URL = 'http://localhost:8080/users'

export const Profile = ( loggedInUser ) => {
   const[userId, setUserId] = useState(0)
   const[accessToken, setAccessToken] = useState('')
   
   const changeName = (userObject) => {
        document.getElementById('name').innerHTML = userObject.name 
   }

   useEffect(() => {
       console.log(loggedInUser)
        // Never do this unless you messed up somwhere else
        loggedInUser = loggedInUser.loggedInUser
        setUserId(loggedInUser._id);
        setAccessToken(loggedInUser.accessToken);
        
     fetch(`${URL}/${userId}`, {
            method: 'GET',
            // Include the accessToken to get the protected endpoint
            headers: {'Authorization': accessToken}
        })
            .then(res => res.json())
            // SUCCESS: Do something with the information we got back
            .then(json => changeName(json))
            .catch(err => console.log('error:', err)) //401
    
    })

return (
    <div>Profile <div id="name"></div>
    </div>
)
} 

