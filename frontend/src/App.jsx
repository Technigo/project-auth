import { useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MainSection } from "./MainSection";

export const App = () => {
  const [formSelect, setFormSelect] = useState("Sign Up");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <>
      <Header
        setFormSelect={setFormSelect}
        isLoggedIn={isLoggedIn}
        setIsRegistered={setIsRegistered}
      />
      <MainSection
        formSelect={formSelect}
        setFormSelect={setFormSelect}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isRegistered={isRegistered}
        setIsRegistered={setIsRegistered}
      />
      <Footer />
    </>
  );
};
