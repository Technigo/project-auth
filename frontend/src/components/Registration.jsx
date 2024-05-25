//imports
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../reusables/Header";
import { Button } from "../reusables/Button";

const API_KEY = "https://project-auth-ziup.onrender.com";
// const API_KEY = "http://localhost:8080";

//styling
const RegistrationSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: hidden;

  @media all and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media all and (min-width: 1024px) {
    width: 50%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

const StyledInput = styled.input`
  width: 280px;
  background: var(--grey);
  border: none;
  border-radius: 30px;
  padding: 20px;
  height: 50px;
  margin: 10px;
  font-size: 1.1em;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media all and (min-width: 744px) {
    width: 400px;
  }
`;

const FormText = styled.p`
  text-align: center;
  padding: 0 20px;
`;

//component
export const Registration = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_KEY}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Error registering:", error);
      setError("Something went wrong");
    }
  };

  return (
    <RegistrationSection>
      <Header />
      <FormWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Username"
            aria-label="Name"
            required
          />

          <StyledInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            aria-label="email"
            required
          />

          <StyledInput
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            aria-label="password"
            required
          />
          {/* shows error message */}
          {error && <p>Please try again!</p>}
        </StyledForm>
        <Button onClick={handleSubmit}>Register</Button>
        <FormText>If you already have an account👇</FormText>

        <Link to={`/login`}>
          <h2>Login here</h2>
        </Link>
        <Link to={`/`}>
          <p>Home</p>
        </Link>
      </FormWrapper>
    </RegistrationSection>
  );
};
