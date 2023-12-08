import { BrowserRouter, Routes } from "react-router-dom"
import { routes } from "./routes/Routes"


export const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <div className="wrapper">
          <Routes>{routes}</Routes>
        </div>
      </BrowserRouter>
    </>
  );
};


// export const App = () => {
//   return <div>Find me in src/app.jsx!</div>;
// };
