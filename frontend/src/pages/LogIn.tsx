import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { ButtonSubmit } from "../components/ButtonSubmit";

export const LogIn = () => {
  return (
    <div className="w-full sm:max-w-[400px]">
      <h2 className="text-3xl text-center font-bold text-lime-900">Saku TODO 🌸</h2>
      <form
        className="w-96 sm:w-full"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          alert(JSON.stringify(formJson));
          console.log(formJson);
        }}
      >
        <LoginForm />
        <div className="flex flex-col items-center justify-center">
          <ButtonSubmit text="Log in" />
          <p className="text-center mt-2">
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
