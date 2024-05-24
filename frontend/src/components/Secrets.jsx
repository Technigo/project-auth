import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import loading from "../assets/loading.json";
import { BackHome } from "./BackHome";

import "../styles/Secrets.css";

export const Secrets = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [secrets, setSecrets] = useState(null);
  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const accessToken = JSON.parse(localStorage.getItem("access_token"));
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
        console.log(data);
        if (!data.success) throw new Error("Failed to fetch secrets", response);
        setSecrets(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    fetchSecrets();
  }, []);

  return (
    <>
      <BackHome />
      {error && <p>{error}</p>}
      {secrets ? (
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
      ) : (
        <Lottie animationData={loading} loop={true} className="loading" />
      )}
    </>
  );
};
