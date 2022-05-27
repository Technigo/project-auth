import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import { Button } from "@mui/material";

// import { authenticated } from "reducers/auth";

const HomePage = () => {
  const authToken = useSelector((state) => state.authenticated.authToken);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
  }, [authToken]);

  const fetchSighting = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken: authToken }),
    };
    try {
      const response = await fetch(
        "https://project-auth-asm.herokuapp.com/sighting",
        options
      );
      const data = await response.json();
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": authToken
  //     }
  //   }
  // })

  // fetch(,options)

  return (
    <>
      <Header />
      <Button variant="contained" onClick={fetchSighting}>
        Discover the truth
      </Button>
    </>
  );
};

export default HomePage;
