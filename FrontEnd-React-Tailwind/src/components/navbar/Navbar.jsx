import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faClipboardList, faEnvelope, faPeopleGroup, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const location = useLocation();

  let timerId;

  const handleMouseMove = () => {
    setIsMouseMoving(true);
    clearTimeout(timerId);
    timerId = setTimeout(() => setIsMouseMoving(false), 3000);
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };



return (
  <nav
    className={`fixed top-0 left-0 right-0 transition-transform transform ${
      isMouseMoving ? "translate-y-0" : "-translate-y-full"
    } z-50 bg-gray-800 text-white p-2`}
    style={{ paddingTop: "1px", paddingBottom: "0px" }}
  >
   
    {isMenuOpen && (
      <div className="fixed top-0  left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 z-40" onClick={closeMenu}></div>
    )}
    <div className={`flex items-center justify-between ${isSmallScreen ? "lg:w-56" : ""}`}>
      <NavLink className="text-xl font-bold" to="/" exact activeClassName="active">
        <img
          src="/images/1-fotor-20230919192113.jpg"
          alt="Logo"
          height="100"
          width="100"
          style={{ borderRadius: "50%" }}
        />
      </NavLink>
      <div className="flex lg:hidden">
        <button onClick={toggleMenu} className="text-white">
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="2x" />
        </button>
      </div>
      <div className={`lg:flex bg-gray-800  lg:items-center lg:justify-end ${isMenuOpen ? "block" : "hidden"} ${isSmallScreen ? "absolute  top-24 right-0 h-full pt-2" : ""}`}>
        {isLoggedIn ? (
          <NavLink to="/user" activeClassName="active" className="block p-4 bg-gray-800 py-2 lg:inline-block">
            <FontAwesomeIcon icon={faUser} size="lg" />
            <span className="ml-2">Mi Cuenta</span>
          </NavLink>
        ) : (
          <NavLink to="/login" activeClassName="active" className="block p-4  bg-gray-800 bg-opacity-40 py-2 lg:inline-block">
            <FontAwesomeIcon icon={faUser} size="lg" />
            <span className="ml-2">Iniciar sesión</span>
          </NavLink>
        )}
        <NavLink to="/" activeClassName="active" className="block p-4 bg-gray-800  py-2 lg:inline-block">
          <FontAwesomeIcon icon={faHome} size="lg" />
          <span className="ml-2">Inicio</span>
        </NavLink>
        <NavLink to="/rentals" activeClassName="active" className="block p-4 bg-gray-800  py-2 lg:inline-block">
          <FontAwesomeIcon icon={faClipboardList} size="lg" />
          <span className="ml-2">Alquileres</span>
        </NavLink>
        <NavLink to="/contact" activeClassName="active" className="block p-4 bg-gray-800  py-2 lg:inline-block">
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
          <span className="ml-2">Contacto</span>
        </NavLink>
        <NavLink to="/aboutUs" activeClassName="active" className="block p-4 bg-gray-800 py-2 lg:inline-block">
          <FontAwesomeIcon icon={faPeopleGroup} size="lg" />
          <span className="ml-2">Sobre nosotros</span>
        </NavLink>
      </div>
    </div>
  </nav>
);

};

export default Navbar;

