import { BrowserRouter , Routes } from "react-router-dom";
import {routes} from "./routes/RoutesComp"



export const App = () => {
  return <div>
    <BrowserRouter>
    <div className="wrapper">
      <Routes>{routes}</Routes>
    </div>
    </BrowserRouter>
  </div>;
};
