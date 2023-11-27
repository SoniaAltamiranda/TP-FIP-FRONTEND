import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { propertiesContext } from "../../context/propertiesContext";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import RegisterProperty from "../property/RegisterProperty";
import MyProperties from "../property/MyProperties";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

function User() {
  const { user, logout } = useAuth();
  const properties = useContext(propertiesContext);

  const [shownComponent, setShownComponent] = useState(null);
  const [userProperties, setUserProperties] = useState([]);
  const [showMyProperties, setShowMyProperties] = useState(false);

  useEffect(() => {
    setUserProperties(propertiesByUser);
  }, [user, properties]);

  const containerStyle = {
    backgroundImage: `url('../../../public/images/fondo.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const propertiesByUser = user
    ? properties.filter((property) => property.id_propietor === user.id)
    : [];

  const handleShowComponent = (component) => {
    setShowMyProperties(component === "My Properties");
    setUserProperties(component === "My Properties" ? propertiesByUser : []);
    setShownComponent(component);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34495E",
      cancelButtonColor: "#566573",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        window.location.href = "http://localhost:5173/"; // Redirige al home
      }
    });
  };

  return (
    <div className="flex flex-col h-full sm:flex-row" style={containerStyle}>
      <div
        className="flex flex-col justify-center  items-center bg-gray-800 text-white pt-32 space-y-12 p-4 sm:w-1/4 flex-grow f-screen"
        
      >
        <h1 className="text-3xl font-bold ">
          ¡Bienvenido, {user ? user.name : "usuario"}!
        </h1>

        <Link
          to="/rentals"
          className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-200 mb-4 flex items-center justify-center"
        >
          Alquilar
        </Link>
        <button
          className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
          onClick={() => handleShowComponent("Register Property")}
        >
          Publicar
        </button>
        <button
          className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
          onClick={() => handleShowComponent("My Properties")}
        >
          Mis Publicaciones
        </button>
        <button
          className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
          onClick={() => handleShowComponent("Editar Usuario")}
        >
          Editar mis datos
        </button>
        <button
          className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
          onClick={() => handleShowComponent("Eliminar Usuario")}
        >
          Eliminar mi usuario
        </button>
        <button
          className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
          onClick={handleLogout}
        >
          Salir
        </button>
      </div>

      <div className="w-full sm:w-3/4 p-4 mt-8 mx-auto my-auto">
        {shownComponent === "Register Property" && <RegisterProperty user={user} />}
        {shownComponent === "My Properties" && (
          <MyProperties properties={userProperties} />
        )}
         {shownComponent === "Editar Usuario" && <EditUser user={user} />}
        {shownComponent === "Eliminar Usuario" && <DeleteUser />}
      </div>
    </div>
  );
}

export default User;
