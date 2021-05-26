import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { API_URL, EDIT_USER } from '../reusable/urls'

const Profile = () => {
  const [fullName, setFullName] = useState('')
  const [age, setAge] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  const account = useSelector(store => store.account)

  const onFormSubmit = (event) => {
    event.preventDefault()


    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: fullName })
    }

    fetch(EDIT_USER(account.id), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log(data)
        } else {
          console.log(data)
        }
      })
      .catch()
    console.log('fetch done')
  }

  return (
    <section className="profile-info-section">
      <h3>Welcome!</h3>
      <div className="profile-info-wrapper">
        <div className="profile-info">
          <p>{`Username: ${account.username}`}</p>
          <p>{`Email: ${account.email}`}</p>
        </div>
        <div className="profile-form-wrapper">
          <p>Add more info to your profile</p>
          <form className="profile-info-form" onSubmit={onFormSubmit}>
          <label htmlFor="fullname">Full name</label>
            <input id="fullname" className="input fullname-input" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} />
            <label htmlFor="age">Age</label>
            <input id="age" className="input age-input" type="number" value={age} onChange={(event) => setAge(event.target.value)} />
            <label htmlFor="location">Location</label>
            <input id="location" className="input location-input" type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
            <label htmlFor="description">Description</label>
            <textarea id="description" className="description-textarea" value={description} onChange={(event) => setDescription(event.target.value)} >
            
            </textarea>
            <button className="btn add-btn" type="submit">Add</button>
            
          </form>
        </div>
      </div>
    </section>

  )
}

export default Profile