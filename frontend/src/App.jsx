import { BrowserRouter, Routes } from "react-router-dom";
import { routes } from "./routes/Routes";

export const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Routes>{routes}</Routes>
      </main>
    </BrowserRouter>
  );
};
