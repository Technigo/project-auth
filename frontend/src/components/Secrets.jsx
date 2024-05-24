import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Secrets = () => {
  const navigate = useNavigate();

  const [secrets, setSecrets] = useState(null);
  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"));
        const response = await fetch(
          "https://project-auth-lh3p.onrender.com/secrets",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch secrets", response);
        const data = await response.json();
        setSecrets(data);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    fetchSecrets();
  }, [navigate]);

  return (
    <>
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
        <p>Loading...</p>
      )}
    </>
  );
};
