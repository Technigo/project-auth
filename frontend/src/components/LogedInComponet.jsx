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
