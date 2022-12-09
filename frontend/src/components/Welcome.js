import React, { useEffect } from "react";
import { StyledButton, StyledDiv } from "GlobalStyles";
import { useNavigate } from "react-router-dom";


export const Welcome = () => {
  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');

  const navigate = useNavigate();

  if (!accessToken === undefined || !accessToken === null) {
    navigate("/");
  }

  const clearStorage = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('username')
    navigate("/");
  }
  
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    }
  } 
  
  useEffect(() => {
    fetch ('https://project-auth-ca23vvjbjq-lz.a.run.app/welcome', options)
    .then((response) => response.json())
    // .then((data) => {
    //   console.log(data)
    //   if (!data.success) {
    //     console.log(data)
    //   }
    // })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  // If there is an accesstoken present, log user in and display welcome page, 
  // otherwise ask them to log in
  return (
    <StyledDiv>
      {accessToken && (
        <div>
          <h2>hello {username}, you are now logged in</h2>
          <StyledButton onClick={()=> clearStorage()}>Log out</StyledButton>
        </div>
      )}
      {!accessToken && (
        <div>
          <h2>Please log in</h2>
          <StyledButton onClick={()=> clearStorage()}>Go to start page</StyledButton>
        </div>
      )}
    </StyledDiv>
  )
}
