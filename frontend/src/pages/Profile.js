import React, { useState, useEffect } from "react";

const token = localStorage.getItem("token");

const Profile = ({ API_URL }) => {
  const [responseData, setResponseData] = useState({});

  const fetchProfile = () => {
    fetch(`${API_URL}/secrets`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setResponseData(data));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
 
      {responseData.user  && (
        <h1>
          Hi {responseData.user.name}, {responseData.secret}
        </h1>
      )}
    </>
  );
};

export default Profile;
