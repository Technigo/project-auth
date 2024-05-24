import {useState} from "react"
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MainSection } from "./MainSection";

export const App = () => {
  const [formSelect, setFormSelect] = useState("Sign Up");
  
  return (
    <>
      <Header formSelect={formSelect} setFormSelect={setFormSelect} />
      <MainSection formSelect={formSelect} />
      <Footer />
    </>
  );
};
