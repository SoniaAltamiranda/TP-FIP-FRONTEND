// import { useState, useEffect } from "react";
// import { NavLink } from "./NavLink";
// import { useLocation } from "react-router-dom";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   
//   const location = useLocation();
//   let timerId;

//   const handleMouseMove = () => {
//     setIsMouseMoving(true);
//     clearTimeout(timerId);
//     timerId = setTimeout(() => setIsMouseMoving(false), 2000);
//   };

//   useEffect(() => {
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   useEffect(() => {
//     // Verificar si hay un token en el localStorage
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   const handleLogout = () => {
//     // Limpiar el token del localStorage
//     localStorage.removeItem("token");
//     // Redirigir al usuario a la página de inicio o de inicio de sesión
//     window.location.href = "/login"; // O utiliza navigate('/login')
//   };
import React, { useState, useEffect } from "react";
import { NavLink,  } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
const [isMouseMoving, setIsMouseMoving] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };


  return (
    <nav
    className={`fixed top-0 left-0 right-0 transition-transform transform ${
      isMouseMoving ? "translate-y-0" : "-translate-y-full"
    } z-50 bg-gray-800 text-white p-2`}
    style={{ paddingTop: "0px", paddingBottom: "0px" }}
  >
    <div className="flex items-center justify-between">
      <NavLink
        className="text-xl font-bold"
        to="/"
        exact
        activeClassName="active"
      >
        <img
          src="/images/1-fotor-20230919192113.jpg"
          alt="Logo"
          height="100"
          width="100"
          style={{ borderRadius: "50%" }}
        />
      </NavLink>
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Cerrar sesión</button>
        ) : (
          <NavLink to="/login" activeClassName="active">Iniciar sesión</NavLink>
        )}
        <NavLink to="/rentals" activeClassName="active">Alquileres</NavLink>
        <NavLink to="/contact" activeClassName="active">Contacto</NavLink>
        <NavLink to="/aboutUs" activeClassName="active">Sobre Nosotros...</NavLink>
      </div>
    </div>
  </nav>
  
    // <nav
    //   className={`fixed top-0 left-0 right-0 transition-transform transform ${
    //     isMouseMoving ? "translate-y-0" : "-translate-y-full"
    //   } z-50 bg-gray-800 text-white p-2`}
    //   style={{ paddingTop: "0px", paddingBottom: "0px" }}
    // >
    //   <div className="flex items-center justify-between">
    //     <NavLink
    //       className="text-xl font-bold"
    //       to="/"
    //       exact
    //       isActive={() => location.pathname === "/"}
    //     >
    //       <img
    //         src="/images/1-fotor-20230919192113.jpg"
    //         alt="Logo"
    //         height="100"
    //         width="100"
    //         style={{ borderRadius: "50%" }}
    //       />
    //     </NavLink>
    //     <div className="flex space-x-4">
    //       {isLoggedIn ?(
    //         <NavLink
    //           to="/login"
    //           isActive={() => location.pathname.includes("/login")}
    //         >
    //           Iniciar sesión
    //         </NavLink>
    //       ) :(
    //         <>
    //           <NavLink to="/user">Mi Cuenta</NavLink>
    //           {location.pathname === "/user"}
    //         </>
    //       )  }
    //       <NavLink
    //         to="/rentals"
    //         isActive={() => location.pathname.includes("/rentals")}
    //       >
    //         Alquileres
    //       </NavLink>
    //       <NavLink
    //         to="/contact"
    //         isActive={() => location.pathname.includes("/contact")}
    //       >
    //         Contacto
    //       </NavLink>
    //       <NavLink
    //         to="/aboutUs"
    //         isActive={() => location.pathname.includes("/aboutUs")}
    //       >
    //         Sobre Nosotros...
    //       </NavLink>
          
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
