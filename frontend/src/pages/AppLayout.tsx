import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="bg-gradient-to-r from-amber-200 to-yellow-500 min-h-screen flex flex-col items-center pt-32 ">
      <Outlet />
    </div>
  );
};
