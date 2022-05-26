import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_URL } from "utils/utils";
import thoughts from "reducers/thoughts";
import user from "reducers/user";

export const Welcome = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const thoughtItems = useSelector((store) => store.thoughts.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);
  //lagt till navigate här torsdag

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    fetch(API_URL("thoughts"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(thoughts.actions.setItems(data.response));
          dispatch(thoughts.actions.setError(null));
        } else {
          dispatch(thoughts.actions.setError(data.response));
          dispatch(thoughts.actions.setItems(null));
        }
      });
  }, [accessToken]);
  //adderat accessToken här torsdag
  return (
    <>
      <div className="links">
        <Link to="/login">LINK TO /login</Link>
      </div>
      <section className="welcome-box">
        <h2>HELLO!</h2>
        <p>If you see this you have successfully logged in!</p>
        {/* {thoughtItems.map((item) => {
          return <div key={item._id}>{item.message}</div>;
        })} */}

        <div className="logout-btn">
          <button
            type="button"
            onClick={() => dispatch(user.actions.setAccessToken(null))}
          >
            Log out
          </button>
        </div>
      </section>
    </>
  );
};
