import React, {useState, useEffect} from 'react'
import './profile.css'

export const Profile = ({userSignedIn, onClick, user}) => {

  const accessToken = window.localStorage.getItem('accessToken')
  const [username, setUsername] = useState('user')
 
  useEffect(() => {
    const fetchUserData = () => {
     const URL= `https://project-auth-app.herokuapp.com/users/current`
      return fetch(URL, {
        method: 'GET',
        headers: {'Authorization': accessToken}
      })
      .then(res => res.json())
      .then(json => setUsername(json.name))
      .catch(err => {
        console.log('error', err)
      })
    }
    fetchUserData()
  })

  return ( 
    
    <section className='profile-container'>
    <h2>{` Hello ${username}`} </h2>
    <button type='button' className='button-signout' onClick={onClick}>Sign out </button>
    </section>
  )
}