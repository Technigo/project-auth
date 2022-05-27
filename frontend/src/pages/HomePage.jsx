import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import { Button, Stack } from "@mui/material";
import LoadingSpinner from "components/LoadingSpinner";
import Sighting from "components/Sighting";

// import { authenticated } from "reducers/auth";

const HomePage = () => {
  const authToken = useSelector((state) => state.authenticated.authToken);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sighting, setSighting] = useState({});

  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
  }, [authToken]);

  const fetchSighting = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    };
    try {
      setLoading(true);
      const response = await fetch(
        "https://project-auth-asm.herokuapp.com/sighting",
        options
      );
      const data = await response.json();
      setSighting(data.response);
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
      <Stack
        direction="column"
        mt={12}
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        {loading && <LoadingSpinner />}
        {!loading && (
          <Sighting
            sighting={sighting}
            comments={sighting.comments}
            city={sighting.city}
            country={sighting.country}
          />
        )}
        <Button
          variant="contained"
          onClick={fetchSighting}
          color="secondary"
          sx={{ width: 320 }}
        >
          Discover the truth
        </Button>
      </Stack>
    </>
  );
};

export default HomePage;
