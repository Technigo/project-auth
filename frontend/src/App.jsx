import { BrowserRouter, Routes } from "react-router-dom";
import { routes } from "./routes/Routes";

export const App = () => {
  return (
    // BrowserRouter is a component that wraps the entire application and provides the routing functionality
    <BrowserRouter>
      <main>
        {/* Routes is a component that renders the routes */}
        <Routes>{routes}</Routes>
      </main>
    </BrowserRouter>
  );
};
