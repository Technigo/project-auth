import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-screen h-20 bg-yellow-200 flex items-center justify-center">
      <nav className="flex list-none gap-7 text-green-800">
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
