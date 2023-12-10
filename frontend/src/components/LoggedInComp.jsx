import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userStore } from "../stores/userStore";

// Getting the backend API URL from environment variables
const apiEnv = import.meta.env.VITE_BACKEND_API;

// Funcitonal component definition for the logged-in component
export const LoggedinComp = () => {
  // Destructuring values from the user store
  const { accessToken, isLoggedIn, setIsLoggedIn } = userStore();
  // Accessing the navigation function from React Router
  const navigate = useNavigate();

  // Fetch content from the /logged-in endpoint when the component mounts
  useEffect(() => {
    const fetchLoggedInData = async () => {
      try {
        // Making a request to the backend /logged-in endpoint
        const response = await fetch(`${apiEnv}/logged-in`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`, // Including the user's token in the request
          },
        });

        // Checking if the request was successful (status code 200)
        if (response.ok) {
          // Parsing and logging the response data
          const data = await response.json();
          console.log(data);
          // Setting the user as logged in
          setIsLoggedIn(true);
        } else {
          // Handling unsuccessful request by logging an error and navigating to the home page
          console.error("Failed to fetch authenticated content");
          navigate("/");
        }
      } catch (error) {
        // Handling any errors that occur during the fetch process
        console.error("Error fetching authenticated content:", error);
      }
    };

    // Invoking the fetch function when the component mounts
    fetchLoggedInData();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  // Rendering the component content bawsed on the user's logged-in status
  return (
    isLoggedIn && (
      <div>
        <img
          src="https://cdn.pixabay.com/photo/2023/11/24/17/13/ai-generated-8410330_1280.png"
          alt="AI Generated Image"
          style={{ width: "50vh", height: "auto" }}
        ></img>
        Congratulations! You are logged in. Here is a cute puppy for you!
      </div>
    )
  );
};
