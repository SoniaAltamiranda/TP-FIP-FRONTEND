// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { propertiesContext } from "../../context/propertiesContext";
import RegisterProperty from "../property/RegisterProperty";
import MyProperties from "../property/MyProperties";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

function User() {
  const { state } = useLocation();
  const user = state ? state.user : null;
  const properties = useContext(propertiesContext);

  const [shownComponent, setShownComponent] = useState(null);
  const [userProperties, setUserProperties] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [showMyProperties, setShowMyProperties] = useState(false);

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

  return (
    <div className="h-screen flex flex-col sm:flex-row" style={containerStyle}>
      <div className="flex flex-col justify-center items-center bg-gray-800 text-white pt-6 space-y-12 p-4 sm:w-1/4">
      <h1 className="text-3xl font-bold mb-10 mt-24">¡Bienvenido, {user ? user.name :'usuario'}!</h1>
        
        <button
          className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-200 mb-4"
          onClick={() => (window.location.href = "http://localhost:5173/rentals")}
        >
          Alquilar
        </button>
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
      </div>

      <div className="w-full sm:w-3/4 p-4 mt-8 mx-auto my-auto">
        {shownComponent === "Register Property" && <RegisterProperty />}
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
