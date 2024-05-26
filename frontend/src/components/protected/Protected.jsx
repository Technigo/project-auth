import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../auth/Logout";
import axios from "../../api/config";

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

        const response = await axios.get("/auth/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      <Logout />
    </div>
  );
};

export default Protected;
