import { LogIn } from "./LogIn";
import { Register } from "./Register";

export const Home = () => {
  return (
    <div className="outer-container">
      <LogIn />
      <Register />
    </div>
  );
};
