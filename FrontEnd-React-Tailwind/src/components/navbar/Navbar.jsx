import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faClipboardList, faEnvelope, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  const location = useLocation();

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-transform transform ${
        isMouseMoving ? "translate-y-0" : "-translate-y-full"
      } z-50 bg-gray-800 text-white p-2`}
      style={{ paddingTop: "0px", paddingBottom: "0px" }}
    >
      <div className="flex items-center justify-between">
        <NavLink className="text-xl font-bold" to="/" exact activeClassName="active">
          <img
            src="/images/1-fotor-20230919192113.jpg"
            alt="Logo"
            height="100"
            width="100"
            style={{ borderRadius: "50%" }}
          />
        </NavLink>
        <div className="flex space-x-12">
          {isLoggedIn ? (
            <NavLink to="/user" activeClassName="active">
              <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" /> Mi Cuenta
            </NavLink>
          ) : (
            <NavLink to="/login" activeClassName="active">
              <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" /> Iniciar sesión
            </NavLink>
          )}
          <NavLink to="/" activeClassName="active">
            <FontAwesomeIcon icon={faHome} size="lg" className="mr-2" /> Inicio
          </NavLink>
          <NavLink to="/rentals" activeClassName="active">
            <FontAwesomeIcon icon={faClipboardList} size="lg" className="mr-2" /> Alquileres
          </NavLink>
          <NavLink to="/contact" activeClassName="active">
            <FontAwesomeIcon icon={faEnvelope} size="lg" className="mr-2" /> Contacto
          </NavLink>
          <NavLink to="/aboutUs" activeClassName="active">
            <FontAwesomeIcon icon={faPeopleGroup } size="lg" className="mr-2" /> Sobre nosotros
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
