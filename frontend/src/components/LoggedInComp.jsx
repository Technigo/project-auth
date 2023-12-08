import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userStore } from "../stores/userStore";

export const LoggedinComp = () => {
  const { accessToken, isLoggedIn, setIsLoggedIn } = userStore();
  const navigate = useNavigate()

    // Fetch content from your /logged-in endpoint
    useEffect(() => {
    const fetchLoggedInData = async () => {
      try {
        const response = await fetch("http://localhost:8081/logged-in", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`, // Include the user's token

          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setIsLoggedIn(true)

        } else {
          console.error("Failed to fetch authenticated content");
          navigate("/")
        }
      } catch (error) {
        console.error("Error fetching authenticated content:", error);
      }
    }

    fetchLoggedInData()
}, [])

  return (

    isLoggedIn &&
        <div>
        <img
          src="https://cdn.pixabay.com/photo/2023/11/24/17/13/ai-generated-8410330_1280.png"
          alt="AI Generated Image"
          style={{ width: "50vh", height: "auto" }}
        ></img>
        In essence, now you're logged in. Here is a cute puppy for you!
      </div> 
    
    
  );
};
