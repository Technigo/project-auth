import { useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MainSection } from "./MainSection";

export const App = () => {
  const [formSelect, setFormSelect] = useState("Sign Up");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMessage, setIsMessage] = useState(false);

  return (
    <>
      <Header
        setFormSelect={setFormSelect}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setIsMessage={setIsMessage}
      />
      <MainSection
        formSelect={formSelect}
        setFormSelect={setFormSelect}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isMessage={isMessage}
        setIsMessage={setIsMessage}
      />
      <Footer />
    </>
  );
};
