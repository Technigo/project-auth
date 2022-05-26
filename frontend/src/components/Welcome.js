import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { API_URL } from "utils/utils";
import user from "reducers/user";

export const Welcome = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <>
      <div className="links">
        <Link to="/login">LINK TO /login</Link>
      </div>
      <section className="welcome-box">
        <h2>HELLO!</h2>
        <p>If you see this you have successfully logged in!</p>
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
