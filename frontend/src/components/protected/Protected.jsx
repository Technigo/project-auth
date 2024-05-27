import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styling/Protected.css";

const Protected = () => {
  const [protectedData, setProtectedData] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "http://localhost:8080/api/protected",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProtectedData(response.data.message);
      } catch (error) {
        setError("Failed to fetch protected data. Please log in.");
        console.error("Protected data error", error);
        navigate("/login");
      }
    };

    fetchProtectedData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="protectedWrapper">
      <div className="protectedContainer">
        <h1 className="protectedTitle">Here are the kittens!</h1>
        <img src="/Kittens.jpg" alt="Cute kittens" className="protectedImage" />
        {protectedData ? (
          <p className="protectedMessage">{protectedData}</p>
        ) : (
          <p className="errorMessage">{error}</p>
        )}
        <button onClick={handleLogout} className="authButton">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Protected;
