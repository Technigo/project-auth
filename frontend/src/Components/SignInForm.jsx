import { useState } from "react";
import { BtnSignIn } from "./Buttons";
import { useStore } from "../stores/storeData";
import "./SignInForm.css";

export const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { hideForms } = useStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="sign-in-container">
      <div>
        <div className="input-field">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-field">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
      </div>
      <div id="buttons">
        <div className="button-container">
          <button className="back-btn" onClick={hideForms} type="button">
            back
          </button>
        </div>
        <BtnSignIn />
      </div>
    </form>
  );
};
