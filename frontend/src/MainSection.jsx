import "./MainSection.css";
import { Form } from "./Components/Form";

export const MainSection = () => {
  return (
    <section className="main">
      <h2>Welcome to our Authentication Site. <br/> 
      Please sign up here:</h2>
      <Form action={"Sign Up"} />
    </section>
  );
};
