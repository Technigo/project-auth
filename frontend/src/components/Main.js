import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
// import JSConfetti from 'js-confetti';
// import { API_URL } from "../utils/constants";

import user from "../reducers/user";
import { Button } from "./Login";

const Main = () => {
  const username = useSelector((store) => store.user.username);
  const accessToken = useSelector((store) => store.user.accessToken);
  const mode = useSelector((store) => store.user.mode);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const jsConfetti = new JSConfetti();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setUserId(null));
      dispatch(user.actions.setAccessToken(null));
      // jsConfetti.addConfetti();
    });
  };

  return (
    <>
      {/* <Link to="/signin"></Link> */}
      <h1>
        {mode === "signin"
          ? "WELCOME BACK TO THE FUTURE, "
          : "WELCOME TO THE FUTURE, "}
        {username}!
      </h1>
      <div>
        {accessToken && (
          <Button className="logout-button" onClick={onButtonClick}>
            Logout
          </Button>
        )}
      </div>
    </>
  );
};

export default Main;

//HEJA HEJA YOU CAN DO IT!!

//   useEffect(() => {
//     const options = {
//       method: "GET",
//       headers: {
//         Authorization: accessToken,
//       },
//     };

//     fetch(API_URL("userprofile"), options)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           dispatch(userprofile.actions.setProfile(data.response));
//           dispatch(userprofile.actions.setError(null));
//         } else {
//           dispatch(userprofile.actions.setProfile(""));
//           dispatch(userprofile.actions.setError(data.response));
//         }
//       });
//   }, [accessToken])
