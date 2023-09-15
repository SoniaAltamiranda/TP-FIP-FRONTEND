import React, { useState, useEffect } from "react";
import { NavLink } from "./NavLink";

const Navbar = () => {
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  let timerId;
  const handleMouseMove = () => {
    setIsMouseMoving(true);
    clearTimeout(timerId);
    timerId = setTimeout(() => setIsMouseMoving(false), 2000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-transform transform ${
        isMouseMoving ? "translate-y-0" : "-translate-y-full"
      } z-50 bg-gray-800 text-white p-4`}
    >
      <div className="flex items-center justify-between">
        <NavLink
          className="text-xl font-bold"
          to="/"
          exact
          isActive={() => location.pathname === "/"}
        >
          Logo
        </NavLink>
        <div className="flex space-x-4">
          <NavLink
            to="/login"
            isActive={() => location.pathname.includes("/login")}
          >
            Registro/Login
          </NavLink>
          <NavLink
            to="/rentals"
            isActive={() => location.pathname.includes("/rentals")}
          >
            Alquileres
          </NavLink>
          <NavLink
            to="/contact"
            isActive={() => location.pathname.includes("/contact")}
          >
            Contacto
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
