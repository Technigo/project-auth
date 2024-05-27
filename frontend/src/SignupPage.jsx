import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    console.log(username, password);
    navigate("/private");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
};