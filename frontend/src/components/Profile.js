import React from 'react'


const URL = 'http://localhost:8080/users'

export const Profile = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  fetch(`${URL}/${id}`, {

    method: "GET",
    headers: { Authorization: accessToken }
  }) 

  .then((res) => res.json())

}

return (

    <div>

    </div>


)


// return (
//     <div>
//       <h1>Profile</h1>
//       <h2>Status :</h2>
//       <h4>Response :</h4>
//       <p>{`${statusMessage}`}</p>
//       <h4>userId :</h4>
//       <p> {`${userId}`}</p>
//       <h4>accessToken :</h4>
//       <p> {`${accessToken}`}</p>
//       <input type="submit" onClick={login} value="Test Login" />
//       <input type="submit" onClick={logout} value="Test Logout" />
//     </div>
//   );
// };
// export default Profile;