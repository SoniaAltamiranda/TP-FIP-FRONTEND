import { useState, useContext } from "react";
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
    if (component === "My Properties") {
      setShowMyProperties((showMyProperties) => !showMyProperties);
      if (!showMyProperties) {
        setUserProperties(propertiesByUser);
      } else {
        setUserProperties([]);
      }
    } else {
      setShowMyProperties(false);
      setUserProperties([]);
    }
    setShownComponent(component);
  };

  return (
    <div className="h-screen flex flex-row" style={containerStyle}>
      <div className="flex flex-col justify-start items-start pt-20 space-y-12 p-4 w-1/4">
        <h1>Hola, {user.name} ..!!</h1>
        
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded"
          onClick={() =>
            (window.location.href = "http://localhost:5173/rentals")
          }
        >
          Alquilar
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold px-8 py-4 rounded"
          onClick={() => handleShowComponent("Register Property")}
        >
          Publicar
        </button>
        <button
          className="bg-yellow-500 hover-bg-yellow-700 text-white font-bold px-8 py-4 rounded"
          onClick={() => handleShowComponent("My Properties")}
        >
          Mis Publicaciones
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded"
          onClick={() => handleShowComponent("Alquilar")}
        >
          Editar mis datos
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-8 py-4 rounded"
          onClick={() => handleShowComponent("Delete User")}
        >
          Eliminar mi usuario
        </button>
      </div>
      <div className="w-3/4 p-4 mt-8 mx-auto my-auto">
        {shownComponent === "Register Property" && <RegisterProperty />}
        {shownComponent === "My Properties" && (
          <MyProperties properties={userProperties} />
        )}
        {shownComponent === "Delete User" && <DeleteUser />}
      </div>
    </div>
  );
}

export default User;
