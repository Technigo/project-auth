import routes from "./routes/routes";
import { BrowserRouter, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { userStore } from "../stores/userStore";

export const App = () => {
  const { isLoggedIn } = userStore();

  return (
    <div className="wrapper">
      {isLoggedIn ? "" : <Header />}
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </div>
  );
};
