import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import loadingAni from "../assets/loading.json";
import unauthorisedAni from "../assets/401.json";
import { BackHome } from "./BackHome";

import "../styles/Secrets.css";

export const Secrets = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [secrets, setSecrets] = useState(null);
  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchSecrets = async () => {
      try {
        const accessToken = JSON.parse(localStorage.getItem("access_token"));
        if (!accessToken)
          throw new Error("Unauthorised access: please log in first.");
        const response = await fetch(
          "https://project-auth-lh3p.onrender.com/secrets",
          {
            method: "GET",
            headers: {
              Authorization: accessToken,
            },
          }
        );
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        setSecrets(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSecrets();
  }, []);

  return (
    <>
      <BackHome />
      {error && (
        <div className="error-container">
          <p>{error}</p>
          <Lottie
            animationData={unauthorisedAni}
            loop={true}
            className="error"
          />
        </div>
      )}
      {secrets && (
        <div className="message-container">
          <h2 className="greeting">
            Hej {secrets.name} 👋 Check out your secret below!
          </h2>
          <p>id: {secrets.id}</p>
          <p>secret: {secrets.message}</p>
          <button
            onClick={() => {
              localStorage.removeItem("access_token");
              navigate("/");
            }}
            className="signout-btn"
          >
            Sign out
          </button>
        </div>
      )}
      {loading && (
        <Lottie animationData={loadingAni} loop={true} className="loading" />
      )}
    </>
  );
};
