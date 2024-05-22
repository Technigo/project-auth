import { Button } from "./Button";

export const Register = () => {
  return (
    <>
      <div>Register</div>
      <form>
        <label>
          Full name
          <input type="text" placeholder="Your full name"></input>
        </label>
        <label>
          Username
          <input type="text" placeholder="Username"></input>
        </label>
        <label>
          Password
          <input type="password" placeholder="Your Password"></input>
        </label>
        <Button btnText={"Sign up"} />
      </form>
    </>
  );
};
