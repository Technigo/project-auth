import { BrowserRouter, Routes } from "react-router-dom";
import "./index.css";
import { routes } from "./routes/routes.jsx"

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>
            {routes}
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App 