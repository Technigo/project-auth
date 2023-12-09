import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { ButtonSubmit } from "../components/ButtonSubmit";
import { loginUser } from "../sevices/apis";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "../atoms/userAtom";
import { useSetAtom } from "jotai";

export const LogIn = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const setCurrentUser = useSetAtom(userState);

  const handleLogin = async (event: FormEvent<HTMLFormElement> | undefined) => {
    event?.preventDefault();
    setError(false);
    const formData = new FormData(event?.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    const loginData = {
      email: formJson.email,
      password: formJson.password,
    };

    const logined = await loginUser(loginData);
    console.log(logined);
    if (logined.notFound) {
      setError(true);
      alert("User doesn't exist");
    } else {
      alert("You are logged in!!");
      setCurrentUser({ name: logined.name, accessToken: logined.accessToken, login: true });
      navigate("/home");
    }
  };

  return (
    <div className="w-[300px] sm:w-[400px]">
      <h2 className="text-3xl text-center font-bold text-lime-900">Log In</h2>
      <form className="w-full" onSubmit={handleLogin}>
        <LoginForm />
        <div className="flex flex-col items-center justify-center">
          <ButtonSubmit text="log in ⭐️" />
          <p className="text-center mt-4 text-sm">
            You don't have your account yet?
            <br />
            <Link
              to="/signup"
              className="transition duration-150 ease-in-out text-green-900 underline block hover:translate-y-1 "
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
