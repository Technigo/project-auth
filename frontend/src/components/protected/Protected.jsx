import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Protected = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "https://project-auth-ws3k.onrender.com/api/auth/protected",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage(response.data.message);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchProtectedData();
  }, [navigate]);

  return (
    <div className="protectedContainer">
      <h1 className="protectedTitle">Protected Content</h1>
      <p>{message}</p>
    </div>
  );
};

export default Protected;
