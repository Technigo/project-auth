import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./RegistrationForm.css";

//POST to the API endpoint /users to create a new user (name, email, password)

export const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState({
    error: null,
    success: false,
  });

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        clearForm();
        setRegistrationStatus({ error: null, success: true });
        console.log("User created successfully", data);
      } else {
        setRegistrationStatus({ error: response.error, success: false });
        console.error("Error creating user", data);
      }
    } catch (error) {
      console.log(error.message);
      setRegistrationStatus({ error: error, success: false });
      console.error("Error creating user", error);
    }
  };

  return (
    <div>
      <h2 className="title">Register here!</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="name">First name:</label>
          <input
            required={true}
            type="text"
            id="name"
            placeholder="Name McName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email adress:</label>
          <input
            required={true}
            type="email"
            id="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password:</label>
          <input
            required={true}
            type="password"
            id="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button className="full-width" type="submit">
          Register
        </button>
      </form>
      {registrationStatus.success && <p>Success!</p>}
      {registrationStatus.error != null && <p>Error!</p>}
      <Link to={"/"} className="back-link">
        <IoIosArrowBack />
        Back to first page
      </Link>
    </div>
  );
};
