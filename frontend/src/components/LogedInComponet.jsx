import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userStore } from "./UserStore";

export const LogedInComp = () => {
  const { accessToken, isLoggedIn, setIsLoggedIn } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInData = async () => {
      try {
        // Access the VITE_BACKEND_API environment variable using import.meta.env
        const apiEnv = import.meta.env.VITE_BACKEND_API;
        // Ensure the API URL is defined
        if (!apiEnv) {
          throw new Error("Backend API URL is not defined.");
        }
        // Make a GET request using Axios with the access token in the headers
        const response = await axios.get(`${apiEnv}/logged-in`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        });

        // Check if the response status is 200 (OK)
        if (response.status === 200) {
          const data = response.data; // Extract data from the response
          console.log(data); // Log the data to the console
          setIsLoggedIn(true); // Set isLoggedIn state to true
        } else {
          console.error("Failed to fetch authenticated content");
          navigate("/"); // Navigate to the home page if fetching fails
        }
      } catch (error) {
        console.error("Error fetching authenticated content:", error);
        navigate("/"); // Navigate to the home page in case of an error
      }
    };

    fetchLoggedInData(); // Call the fetchLoggedInData function
  }, [accessToken, isLoggedIn, setIsLoggedIn, navigate]); // Dependencies for the useEffect hook

  return (
    isLoggedIn && ( // Render content only if the user is logged in
      <div className="logged-in-content">
        <img
          src="https://cdn.pixabay.com/photo/2023/11/24/17/13/ai-generated-8410330_1280.png"
          alt="AI Generated Image"
          style={{ width: "50vh", height: "auto" }}
        />
        <p>Congratulations! You are logged in!</p>
      </div>
    )
  );
};

/*
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userStore } from "./UserStore";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const LogedInComp = () => {
  const { accessToken, isLoggedIn, setIsLoggedIn } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInData = async () => {
      try {
        const response = await axios.get(`${apiEnv}/logged-in`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setIsLoggedIn(true);
        } else {
          console.error("Failed to fetch authenticated content");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching authenticated content:", error);
        navigate("/");
      }
    };

    fetchLoggedInData();
  }, [accessToken, isLoggedIn, setIsLoggedIn, navigate]);

  return (
    isLoggedIn && (
      <div className="logged-in-content">
        <img
          src="https://cdn.pixabay.com/photo/2023/11/24/17/13/ai-generated-8410330_1280.png"
          alt="AI Generated Image"
          style={{ width: "50vh", height: "auto" }}
        />
        <p>Congratulations! You are logged in!</p>
      </div>
    )
  );
};

/*
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userStore } from "./UserStore";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const LogedInComp = () => {
  const { accessToken, isLoggedIn, setIsLoggedIn } = userStore();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInData = async () => {
      try {
        const response = await fetch(`${apiEnv}/logged-in`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          setIsLoggedIn(true);
        } else {
          console.error("Failed to fetch authenticated content");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching authenticated content:", error);
      }
    };

    fetchLoggedInData();
  });

  return (
    isLoggedIn && (
      <div className="logged-in-content">
        <img
          src="https://cdn.pixabay.com/photo/2023/11/24/17/13/ai-generated-8410330_1280.png"
          alt="AI Generated Image"
          style={{ width: "50vh", height: "auto" }}></img>
        <p>Congratulations! You are logged in. Here is a cute puppy for you!</p>
      </div>
    )
  );
};
*/
