import { BrowserRouter, Routes, Link } from "react-router-dom";
//import { Register } from "./Pages/Register";
//import { Login } from "./Pages/Login";
import routes from "./Routes/Routes";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          {/* <Routes>{routes}</Routes> */}
          <Routes>{routes}</Routes>
        </main>
      </BrowserRouter>
    </>
  );
};
