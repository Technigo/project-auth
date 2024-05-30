//imports
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../reusables/Header";
import { Button } from "../reusables/Button";
import { Loading } from "../reusables/Loading";

// const apiEnv = "http://localhost:8080/";

//styling
const LoginSection = styled.section`
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
export const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const apiEnv = import.meta.env.VITE_API_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiEnv}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        const data = await response.json();
        const accessToken = data.accessToken;
        setMessage("Sign-in successful!");
        localStorage.setItem("accessToken", accessToken);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setMessage(`Sign-in failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginSection>
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
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            aria-label="password"
            required
          />
          {/* show error message */}
          {message && <p>{message}</p>}
        </StyledForm>
        {/* Conditionally render loading spinner or login button */}
        {loading ? <Loading /> : <Button onClick={handleSubmit}>Login</Button>}
        <FormText>
          If you don&rsquo;t have an account yet, create yours below.👇{" "}
        </FormText>
        <Link to={`/registration`}>
          <h2>Register</h2>
        </Link>
        <Link to={`/`}>
          <p>Home</p>
        </Link>
      </FormWrapper>
    </LoginSection>
  );
};
