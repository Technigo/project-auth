// here we import the useNavigate hook from react-router-dom and use it to navigate to the /private route when the form is submitted.
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  // getting the function out
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    // prevent dedefault stops the page from reloading
    event.preventDefault();
    
    navigate("/private");
  };
  return (
    // here we have to first register an event handler for the form submission
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};
