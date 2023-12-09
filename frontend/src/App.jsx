import { BrowserRouter, Routes } from "react-router-dom";

import routes from "./assets/routes/routes";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>{routes}</Routes>
        </main>
      </BrowserRouter>
    </>
  );
};
