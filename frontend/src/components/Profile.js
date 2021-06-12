import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ProfileForm from './ProfileForm'

import { account } from '../reducers/account'

import { EDIT_USER } from '../reusable/urls'

const Profile = () => {
  const user = useSelector(store => store.account)

  const [fullName, setFullName] = useState(user.fullName)
  const [age, setAge] = useState(user.age)
  const [location, setLocation] = useState(user.location)
  const [description, setDescription] = useState(user.desc)

  const dispatch = useDispatch()

  const onFormSubmit = (event) => {
    event.preventDefault()
    
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.accessToken
      },
      body: JSON.stringify({ fullName: fullName, age: age, location: location, description: description })
    }

    fetch(EDIT_USER(user.id), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(account.actions.setProfileInfo(data.updateUser))

          localStorage.setItem('user', JSON.stringify({
            fullName: data.fullName,
            age: data.age,
            location: data.location,
            desc: data.description
          }))
        } else {
          dispatch(account.actions.setErrors(data))
        }
      })
      .finally(() => {
        setFullName(user.fullName)
        setAge(user.age)
        setLocation(user.location)
        setDescription(user.desc)
      })
  }

  return (
    <section className="profile-info-section">
      <h3>Welcome!</h3>
      <div className="profile-info-wrapper">
        <div className="profile-info">
          <p>{`Username: ${user.username}`}</p>
          <p>{`Email: ${user.email}`}</p>
          {user.fullName && 
            <p>{`Name: ${user.fullName}`}</p>
          }
          {user.age && 
            <p>{`Age: ${user.age}`}</p>
          }
          {user.location && 
            <p>{`Location: ${user.location}`}</p>
          }
          {user.desc && 
            <p>{`Description: ${user.desc}`}</p>
          }
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