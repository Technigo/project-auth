import { BrowserRouter, Routes } from "react-router-dom";
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
