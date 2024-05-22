import { Button } from "./Button";

export const LogIn = () => {
  return (
    <>
      <div>LogIn</div>
      <form>
        <label>
          Username
          <input type="text" placeholder="username" />
        </label>
        <label type="password" placeholder="password">
          Password
          <input />
        </label>
        <Button btnText={"Log in"} />
      </form>
    </>
  );
};
