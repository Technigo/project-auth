import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import ProfileForm from './ProfileForm'

import { EDIT_USER } from '../reusable/urls'

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
      body: JSON.stringify({ fullName: fullName, age: age, location: location, description: description })
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
          <ProfileForm
            fullName={fullName}
            setFullName={setFullName}
            age={age}
            setAge={setAge}
            location={location}
            setLocation={setLocation}
            description={description}
            setDescription={setDescription}
            onFormSubmit={onFormSubmit}
          />
        </div>
      </div>
    </section>
  )
}

export default Profile