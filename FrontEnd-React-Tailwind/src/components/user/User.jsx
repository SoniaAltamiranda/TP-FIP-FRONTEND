// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { propertiesContext } from "../../context/propertiesContext";
import RegisterProperty from "../property/RegisterProperty";
import MyProperties from "../property/MyProperties";
import DeleteUser from "./DeleteUser";

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

  const propertiesByUser = properties.filter(
    (property) => property.id_propietor === user.id
  );

  const handleShowComponent = (component) => {
    setShowMyProperties(component === "My Properties");
    setUserProperties(component === "My Properties" ? propertiesByUser : []);
    setShownComponent(component);
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen" style={containerStyle}>
      <div className="w-full sm:w-1/4 p-4 sm:p-14 bg-gray-800 text-white text-center">
        <div>
          <h1 className="text-3xl font-bold mb-10 mt-24">¡Bienvenido, {user.name}!</h1>
       {/* <p className="text-xs text-gray-300 mb-4">
            Nos complace tenerte de vuelta en nuestro espacio digital. Queremos agradecerte sinceramente por elegirnos. Tu presencia es fundamental para el éxito de nuestra plataforma. Estamos comprometidos a proporcionarte una linda experiencia y esperamos que nuestro espacio cumpla con todas tus expectativas.
          </p>
          <p className="text-xs text-gray-300 mb-2">
             Disfruta de tu tiempo aquí y gracias por elegir ALQUILAFÁCIL.COM
          </p>  */}
        </div> 

        <button
          className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
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
          onClick={() => handleShowComponent("Editar Datos")}
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
        {shownComponent === "Eliminar Usuario" && <DeleteUser />}
      </div>
    </div>
  );
}

export default User;
