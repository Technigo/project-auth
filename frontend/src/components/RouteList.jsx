import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Session } from "./Session";

export const RouteList = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logged-in" element={<Session />} />
      </Routes>
    </>
  );
};
