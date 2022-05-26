import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { authenticated } from "reducers/auth";

const HomePage = () => {
  const authToken = useSelector((state) => state.authenticated.authToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/signin");
    }
  }, [authToken]);

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

  return <p>This is homepage</p>;
};

export default HomePage;
