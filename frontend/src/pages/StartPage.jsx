import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

// API URL from .env file or default value
const apiEnv = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";
console.log(apiEnv);

const StartpageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 300px;
    border-radius: 20px 0 20px 0;
    padding: 5px;
  }

  @media screen and (min-width: 668px) and (max-width: 1023px) {
    img {
      width: 400px;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 100vh;
    display: flex;
    flex-direction: row;
    gap: 50px;

    img {
      width: 400px;
    }
  }
`;

const StyledStartPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;

  h1 {
    font-size: 32px;
    color: #b29a74;
  }

  h2 {
    margin: 30px 0;
    text-align: center;
    font-size: 24px;
    color: #38634b;
  }

  p {
    color: #808080;
    font-size: 16px;
    margin-bottom: 10px;
    color: #38634b;
  }

  @media screen and (min-width: 668px) and (max-width: 1023px) {
    h1 {
      font-size: 54px;
    }

    h2 {
      font-size: 32px;
    }

    p {
      font-size: 20px;
    }
  }

  @media screen and (min-width: 1024px) {
    h1 {
      font-size: 80px;
    }

    h2 {
      font-size: 40px;
    }

    p {
      font-size: 20px;
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormFields = styled.div`
  input {
    height: 35px;
    width: 250px;
    border: 1px solid #38634b;
    border-radius: 10px;
    padding-left: 10px;
  }
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  height: 47px;
  margin-top: 20px;

  button {
    cursor: pointer;
    border-radius: 10px;
    padding: 5px 15px;
    font-size: 18px;
    background-color: #38634b;
    color: #fff;
  }

  button:hover {
    background-color: #b29a74;
  }
`;

export const StartPage = () => {
  const [username, setUsername] = useState(""); // Add username state
  const [password, setPassword] = useState(""); // Add password state
  const navigate = useNavigate(); // Add navigate function

  const handleRegister = async () => {
    try {
      // Make a POST request (registration) to the backend with username and password
      const response = await fetch(`${apiEnv}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell the backend that we are sending JSON data
        },
        body: JSON.stringify({ username, password }), // Add username and password to body
      });

      if (response.ok) {
        // Check if response is ok (200)
        const data = await response.json();
        console.log(data);
        // Store the access token in localStorage
        localStorage.setItem("accessToken", data.response.accessToken);
        // Show success message
        alert("You have successfully registered!");
        // Navigate to a new route after successful registration
        navigate("/secrets");
      } else {
        let errorData; // Define errorData variable

        try {
          // Try to parse response as JSON
          errorData = await response.json();
          console.error(errorData); // Log errorData to console
        } catch (error) {
          // Catch errors if response is not JSON
          console.error(error); // Log error to console
        }

        if (response.status === 409) {
          // 409 is a conflict with existing data in the database
          // If the user already exists, show a specific error message
          if (errorData.error === "User with this username already exists") {
            alert(
              "Username already exists. Please choose a different username."
            );
          } else {
            // If the usernamme already exists, show a generic error message
            alert("Username already exists");
          }
          // 400 is a bad request (missing data)
        } else if (response.status === 400) {
          // If username or password is missing, show a specific error message
          if (errorData.error === "Missing username or password") {
            alert("Please provide both username and password.");
          } else {
            alert(
              // If username or password is missing, show a generic error message
              "An error occurred during registration. Please try again."
            );
          }
        } else {
          alert(
            // Show generic error message for all other errors
            "An error occurred during registration. Please try again."
          );
        }

        // Reset form fields on unsuccessful registration
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error(error); // Log network error to console
      alert("An error occurred during registration. Please try again.");

      // Reset form fields on error
      setUsername("");
      setPassword("");
    }
  };

  const handleLogin = async () => {
    try {
      // Make a POST request (login) to the backend with username and password
      const response = await fetch(`${apiEnv}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell the backend that we are sending JSON data
        },
        body: JSON.stringify({ username, password }), // Add username and password to body
      });
      const data = await response.json(); // Get JSON data from response
      console.log(data); // Log data to console

      if (!response.ok) {
        if (
          data.response === "Unauthorized" ||
          data.response === "User not found" // Check if response is "Unauthorized" or "User not found"
        ) {
          console.log("Unauthorized access detected");
          // Show an alert for unauthorized access
          alert(
            "Unauthorized access. Please check your credentials and try again."
          );
        } else {
          // Handle other error cases
          console.error(data);
        }
        return;
      }
      // Store the access token in localStorage
      localStorage.setItem("accessToken", data.response.accessToken);
      // Navigate to a new route after successful login
      navigate("/secrets");
    } catch (error) {
      console.error(error); // Log network error to console
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <StartpageContainer>
      <StyledStartPage>
        <h1>Welcome!</h1>
        <h2>Want to take a sneak peek of the secret content?</h2>
        <p>Please log in or create an account</p>
        <StyledForm>
          <FormFields>
            <input
              label="Username"
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)} // Update username state
              required
            />
          </FormFields>
          <FormFields>
            <input
              label="Password"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)} // Update password state
              required
            />
          </FormFields>
        </StyledForm>
        <Buttons>
          <button onClick={handleLogin}>Log in</button>
          <button onClick={handleRegister}>Register</button>
        </Buttons>
      </StyledStartPage>
      <img src="/pexels-noel-blck.jpg" alt="Woman peaking through leaves" />
    </StartpageContainer>
  );
};
