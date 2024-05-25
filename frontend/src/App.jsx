import { BrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import { RouteList } from "./components/RouteList";

export const App = () => {
  return (
    <BrowserRouter>
      <RouteList />
    </BrowserRouter>
  );
};
