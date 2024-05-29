import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    // prevent dedefault stops the page from reloading
    event.preventDefault();

    // fetch is for sending requests to the server. Post is for sending data to the server.
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // here we are defining what data we are going to send to the server
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
      }),
    })
    // here converting the response from json, which is a string, to an object that we can work with
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // here we are saving the token in the local storage, so the user can stay logged in
        localStorage.setItem("token", res.token);
        navigate("/private");
      });
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