import { NavLink as NavLinkReactRouter } from "react-router-dom";

export const NavLink = ({ to, children, ...props }) => {
  return (
    <NavLinkReactRouter
      {...props}
      activeclassname="text-white px-3 py-2 rounded-md text-lg font-bold"
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
      to={to}
    >
      {children}
    </NavLinkReactRouter>
  );
};
