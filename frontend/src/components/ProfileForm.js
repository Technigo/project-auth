import React from 'react'

const ProfileForm = ({ fullName, setFullName, age, setAge, location, setLocation, description, setDescription, onFormSubmit }) => {
    return (
        <>
            <p>Add more info to your profile</p>
            <form 
                className="profile-info-form" 
                onSubmit={onFormSubmit}
            >
                <label htmlFor="fullname">Full name</label>
                <input 
                    id="fullname" 
                    className="input" 
                    type="text" 
                    value={fullName} 
                    onChange={(event) => setFullName(event.target.value)} 
                />
                <label htmlFor="age">Age</label>
                <input 
                    id="age" 
                    className="input" 
                    type="number" 
                    value={age} 
                    onChange={(event) => setAge(event.target.value)} 
                />
                <label htmlFor="location">Location</label>
                <input 
                    id="location" 
                    className="input" 
                    type="text" 
                    value={location} 
                    onChange={(event) => setLocation(event.target.value)} 
                />
                <label htmlFor="description">Description</label>
                <textarea 
                    id="description" 
                    className="description-textarea" 
                    value={description} 
                    onChange={(event) => setDescription(event.target.value)} 
                >
                </textarea>
                <button className="btn custom-btn" type="submit">Add</button>
          </form>
        </>
    )
}

export default ProfileForm