import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const AppLayout = () => {
  return (
    <div className="bg-gradient-to-r from-amber-200 to-yellow-500 min-h-screen top-0 bottom-0">
      <Header />
      <div className=" flex flex-col items-center pt-32 ">
        <Outlet />
      </div>
    </div>
  );
};
