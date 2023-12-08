import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const apiEnv = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";

console.log(apiEnv);

const StyledStartPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
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
  }

  input::placeholder {
    padding-left: 5px;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
  height: 47px;
  margin-top: 20px;

  button {
    cursor: pointer;
    border: 1px solid #000;
    border-radius: 10px;
    padding: 5px 15px;
    font-size: 18px;
  }
`;

export const StartPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${apiEnv}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle the success response
        localStorage.setItem("accessToken", data.response.accessToken);
        alert("You have successfully registered!");
        // Navigate to a new route after successful registration
        navigate("/secrets");
      } else {
        let errorData;

        try {
          errorData = await response.json();
          console.error(errorData); // Log the error response
        } catch (error) {
          console.error(error); // Handle parsing error
        }

        if (response.status === 409) {
          // Check for specific error messages and handle them
          if (errorData.error === "User with this username already exists") {
            alert(
              "Username already exists. Please choose a different username."
            );
          } else {
            alert("Username already exists");
          }
        } else if (response.status === 400) {
          // Check for other specific error messages and handle them
          if (errorData.error === "Missing username or password") {
            alert("Please provide both username and password.");
          } else {
            alert(
              "An error occurred during registration. Please try again later."
            );
          }
        } else {
          alert(
            "An error occurred during registration. Please try again later."
          );
        }

        // Reset form fields on unsuccessful registration
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error(error); // Handle network errors
      alert("An error occurred during registration. Please try again later.");

      // Reset form fields on error
      setUsername("");
      setPassword("");
    }
  };

  //       if (response.status === 409) {
  //         alert("Username already exists");
  //       } else {
  //         alert(
  //           "An error occurred during registration. Please try again later."
  //         );
  //       }
  //       // Reset form fields on unsuccessful registration
  //       setUsername("");
  //       setPassword("");
  //     }
  //   } catch (error) {
  //     console.error(error); // Handle network errors
  //     alert("An error occurred during registration. Please try again later.");

  //     // Reset form fields on error
  //     setUsername("");
  //     setPassword("");
  //   }
  // };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiEnv}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data); // Handle the success response
      localStorage.setItem("accessToken", data.response.accessToken);
      // Navigate to a new route after successful login
      navigate("/secrets");
    } catch (error) {
      console.error(error); // Handle the error response
    }
  };

  return (
    <StyledStartPage>
      <h1>Welcome!</h1>
      <h2>Register or sign in to get access to some secret stuff</h2>
      <StyledForm>
        <FormFields>
          <input
            label="Username"
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </FormFields>
      </StyledForm>
      <Buttons>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Log in</button>
      </Buttons>
    </StyledStartPage>
  );
};
