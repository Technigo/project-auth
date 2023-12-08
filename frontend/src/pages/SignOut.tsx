import { useSetAtom } from "jotai";
import { ButtonLink } from "../components/ButtonLink";
import { userState } from "../atoms/userAtom";
import { useEffect } from "react";

export const SignOut = () => {
  const setCurrentUser = useSetAtom(userState);
  useEffect(() => {
    setCurrentUser({ name: "", accessToken: "", login: false });
    localStorage.removeItem("accessToken");
  }, []);

  return (
    <div>
      <h2 className="text-3xl text-violet-700 mb-20">You are logged out 👻 </h2>
      <ButtonLink text="Log in 🤖 ??" path="/login" />
    </div>
  );
};
