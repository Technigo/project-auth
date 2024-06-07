import { AuthRoutes } from "./routes/AuthRoutes";
import { BrowserRouter } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <h1>TOP secret saver!</h1>
      <AuthRoutes />
    </BrowserRouter>
  );
};
