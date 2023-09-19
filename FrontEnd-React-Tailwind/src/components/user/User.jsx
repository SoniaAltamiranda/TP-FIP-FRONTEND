import { useState } from "react";
import RegisterProperty from "../property/RegisterProperty";
import DeleteProperty from "../property/DeleteProperty";
import ModifyProperty from "../property/ModifyProperty";
import DeleteUser from "./DeleteUser";

function User() {
  const [shownComponent, setShownComponent] = useState(null);

  const showComponent = (component) => {
    setShownComponent(component);
  };

  const containerStyle = {
    backgroundImage: `url('../../../public/images/fondo.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div className="h-screen flex flex-row" style={containerStyle}>
      <div className="flex flex-col justify-start items-start pt-20 space-y-12 p-4 w-1/4">
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
          onClick={() => showComponent("Register Property")}
        >
          Publicar
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold px-8 py-4 rounded"
          onClick={() => showComponent("Delete Property")}
        >
          Eliminar publicación
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold px-8 py-4 rounded"
          onClick={() => showComponent("Modify Property")}
        >
          Editar Publicación
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded"
          onClick={() => showComponent("Alquilar")}
        >
          Editar mis datos
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold  px-8 py-4 rounded"
          onClick={() => showComponent("Delete User")}
        >
          Eliminar mi usuario
        </button>
      </div>
      <div className="w-3/4 p-4 mt-8 mx-auto my-auto">
        {shownComponent === "Register Property" && <RegisterProperty />}
        {shownComponent === "Delete Property" && <DeleteProperty />}
        {shownComponent === "Modify Property" && <ModifyProperty />}
        {shownComponent === "Delete User" && <DeleteUser />}
      </div>
    </div>
  );
}

export default User;
