import "./MainSection.css";
import { Form } from "./Components/Form";

export const MainSection = () => {
  return (
    <div className="section">
      Welcome to our Authentication Site. Please sign up here:
      <Form action={"Sign Up"} />
    </div>
  );
};
