import { useState } from "react";
import "./SignInForm.css";
import { BtnSignIn } from "./Buttons";

export const SignInForm = () => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="sign-in-container">
      <div>
        <div class="input-field">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <i class="bx bxs-user"></i>
        </div>
        <div class="input-field">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <i class="bx bxs-lock-alt"></i>
        </div>
      </div>
      <BtnSignIn />
    </form>
  );
};
