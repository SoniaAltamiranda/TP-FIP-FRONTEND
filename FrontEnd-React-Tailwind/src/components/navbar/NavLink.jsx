import { NavLink as NavLinkReactRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NavLink = ({ to, children, icon,...props }) => {
  return (
    <NavLinkReactRouter
      {...props}
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium flex items-center"
      activeClassName="text-white px-3 py-2 rounded-md text-lg font-bold"
      to={to}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      {children}
    </NavLinkReactRouter>
  ); 
};