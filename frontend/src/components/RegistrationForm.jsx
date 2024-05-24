import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AlertMessage } from "./AlertMessage";
import "./RegistrationForm.css";

//POST to the API endpoint /users to create a new user (name, email, password)

export const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState({
    error: null,
    success: false,
  });

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const getErrorMessage = () => {
    if (registrationStatus.error === 409) {
      return "User already exists";
    } else {
      return "Something went wrong. Please verify your information.";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://bubblegum-auth.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        clearForm();
        setRegistrationStatus({ error: null, success: true });
        console.log("User created successfully", data);
      } else {
        setRegistrationStatus({ error: response.status, success: false });
        console.error("Error creating user", data);
      }
    } catch (error) {
      console.log(error.message);
      setRegistrationStatus({ error: 400, success: false });
      console.error("Error creating user", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="title">Register here!</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="name">Name:</label>
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

      {loading ? (
        <div>
          <p className="user-loading"> User being created...</p>
        </div>
      ) : (
        <>
          {registrationStatus.success && (
            <AlertMessage type="success" message="User has been created" />
          )}
          {registrationStatus.error != null && (
            <AlertMessage type="error" message={getErrorMessage()} />
          )}
        </>
      )}

      <div className="registration-links">
        <Link to={"/"} className="back-link">
          <IoIosArrowBack />
          Back to first page
        </Link>
        {registrationStatus.success && (
          <Link to={"/login"} className="back-link">
            Go to login
            <IoIosArrowForward />
          </Link>
        )}
      </div>
    </div>
  );
};
