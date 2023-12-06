import { ButtonLink } from "../components/ButtonLink";

export const SignOut = () => {
  return (
    <div>
      <h2 className="text-3xl text-violet-700 mb-20">You are logged out 👻 </h2>
      <ButtonLink text="Log in 🤖 ??" path="/login" />
    </div>
  );
};
