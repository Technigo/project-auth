import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "utils/constants";
import userprofile from "reducers/userprofile";

const Main = () => {
  const userProfile = useSelector((store) => store.userprofile.profile);
  const accessToken = useSelector((store) => store.user.accessToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL("userprofile"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(userprofile.actions.setProfile(data.response));
          dispatch(userprofile.actions.setError(null));
        } else {
          dispatch(userprofile.actions.setProfile([]));
          dispatch(userprofile.actions.setError(data.response));
        }
      });
  }, [accessToken]);

  return (
    <>
      <Link to="/signin"></Link>
      <h1>GAAAAAAAAAH!</h1>
      {userProfile.map((item) => (
        <div key={item._id}>{item.profile}</div>
      ))}
    </>
  );
};

export default Main;

//HEJA HEJA YOU CAN DO IT!!
