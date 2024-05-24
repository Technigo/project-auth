// //imports
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import { Form } from "../reusables/Form";
// import { Header } from "../reusables/Header";
// import { Button } from "../reusables/Button";

// //styling
// const RegistrationContainer = styled.section`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   min-height: 100vh;

//   @media all and (min-width: 1024px) {
//     flex-direction: row;
//   }
// `;

// const FormWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   @media all and (min-width: 1024px) {
//     width: 50%;
//   }
// `;

// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 50px;
// `;

// const StyledTitle = styled.h1`
//   color: var(--darkgreen);
//   font-family: "Abril Fatface", serif;
//   font-weight: 400;
//   font-size: 1.75em;
//   padding-top: 15px;
// `;

// //component
// export const Registration = () => {
//   return (
//     <RegistrationContainer>
//       <Header />
//       <FormWrapper>
//         <Form />
//         <Button>Register</Button>
//         <TextContainer>
//           <p>If you already have an account, sign in on the</p>
//           <Link to={`/login`}>
//             <StyledTitle>Login here</StyledTitle>
//           </Link>
//           <Link to={`/`}>
//             <StyledTitle>Startpage</StyledTitle>
//           </Link>
//         </TextContainer>
//       </FormWrapper>
//     </RegistrationContainer>
//   );
// };

//imports
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Header } from "../reusables/Header";
import { Button } from "../reusables/Button";

const API_KEY = "https://project-auth-ziup.onrender.com";

//styling
const RegistrationSection = styled.section`
  /* display: flex;
  justify-content: center;
  @media all and (min-width: 744px) {
  }
  @media all and (min-width: 1024px) {
  } */
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;

  @media all and (min-width: 744px) {
  }
  @media all and (min-width: 1024px) {
  }
`;

const StyledInput = styled.input`
  width: 280px;
  background: var(--grey);
  border: none;
  border-radius: 30px;
  padding: 20px;
  height: 50px;
  margin: 20px;
  font-size: 1.1em;

  @media all and (min-width: 744px) {
    width: 450px;
  }
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
      <h1>User Registration</h1>

      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <StyledInput
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <label htmlFor="email">Email:</label>
        <StyledInput
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <label htmlFor="password">Password:</label>
        <StyledInput
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {/* shows error message */}
        {error && <p>Please try again!</p>}
      </StyledForm>
      <Button onClick={handleSubmit}>Register</Button>
      <p>If you already have an account</p>
      <Link to={`/login`}>
        <h2>Login here</h2>
      </Link>
      <Link to={`/`}>
        <h2>Home</h2>
      </Link>
    </RegistrationSection>
  );
};
