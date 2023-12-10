import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-screen h-fit p-4 bg-yellow-200 flex flex-col items-center justify-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-6">
        🌸SgifigS🌸
      </h1>
      <nav className="flex list-none gap-4 sm:gap-7 text-green-800">
        <NavLink to="/signup">
          <li className="hover:translate-y-1 transition cursor-pointer">Sign up</li>
        </NavLink>
        <NavLink to="/login">
          <li className="hover:translate-y-1 transition cursor-pointer">Log in</li>
        </NavLink>
        <NavLink to="/signout">
          <li className="hover:translate-y-1 transition cursor-pointer">Sign out</li>
        </NavLink>
      </nav>
    </header>
  );
};
