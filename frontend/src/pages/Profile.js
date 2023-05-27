import React, { useState, useEffect } from "react";
import styled from "styled-components";

const token = localStorage.getItem("token");

const Profile = ({ API_URL }) => {
  const [responseData, setResponseData] = useState({});

  const fetchProfile = () => {
    fetch(`${API_URL}/secrets`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((data) => setResponseData(data));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <ProfileContainer>
      {responseData.user  && (
        <h1>
          Hi {responseData.user.name}, {responseData.secret}
        </h1>
      )}
      <ProfileButton type="button" onClick={handleLogout}>Logout</ProfileButton>
      </ProfileContainer>
    </>
  );
};

export default Profile;

const ProfileContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

h1 {
  font-size: 3rem;
  color: #ffb140;
}
`

const ProfileButton = styled.button`
border-radius: 5px;
border: 1px solid #ffffff;
cursor: pointer;
width: 7rem;
background-color: #a7cdbd;
color: #ffb140;
font-size: 1rem;
font-weight: bold;
margin-top: 1.5rem;
padding: 0.8rem;

@media (max-width: 664px) {
  border-radius: 10px;
  padding: 0.3rem;
  }
`;
