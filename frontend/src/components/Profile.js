import React from 'react'

const Profile = () => {

  return (
    <section className="profile-info-section">
      <h3>Welcome!</h3>
      <div className="profile-info-wrapper">
        <div className="profile-info">
          <p>Name: XXXX </p>
          <p>Email: xx.xx@xxx </p>
        </div>
        <div className="profile-form-wrapper">
          <p>Add more info to your profile</p>
          <form className="profile-info-form">
            <label htmlFor="age">Age</label>
            <input id="age" className="input age-input" type="number" value=""/>
            <label htmlFor="location">Location</label>
            <input id="location" className="input location-input" type="text" value=""/>
            <label htmlFor="description">Description</label>
            <textarea id="description" className="description-textarea"  value="">
            
            </textarea>
            <button className="btn add-btn">Add</button>
            
          </form>
        </div>
      </div>
    </section>

  )
}

export default Profile