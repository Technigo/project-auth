import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import loading from "../assets/loading.json";
import { BackHome } from "./BackHome";

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
        <div>
          <p>{secrets.id}</p>
          <p>{secrets.name}</p>
          <p>{secrets.message}</p>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/");
            }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <Lottie animationData={loading} loop={true} className="animation" />
      )}
    </>
  );
};
