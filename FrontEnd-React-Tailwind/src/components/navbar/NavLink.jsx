import { NavLink as NavLinkReactRouter } from "react-router-dom";

export const NavLink = ({ to, children, ...props }) => {
  return (
    <NavLinkReactRouter
      {...props}
      className={({ isActive }) =>
        isActive
          ? "text-white px-3 py-2 rounded-md text-lg pointer-events-none font-bold"
          : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
      }
      to={to}
    >
      {children}
    </NavLinkReactRouter>
  );
};