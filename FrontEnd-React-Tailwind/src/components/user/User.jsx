import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import RegisterProperty from "../property/RegisterProperty";
import MyProperties from "../property/MyProperties";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import Swal from "sweetalert2";

function User() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [shownComponent, setShownComponent] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const payload = jwtDecode(token);

        const response = await fetch(
          `http://localhost:3000/user/${payload.sub}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleShowComponent = (component) => {
    setShownComponent(component);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        setUserData(null);
        window.location.href = "/";
      }
    });
  };

  

  return (
    <div className="h-screen flex flex-col sm:flex-row">
      <div className="flex flex-col justify-center items-center bg-gray-800 text-white pt-6 space-y-12 p-4 sm:w-1/4">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
          <br />
            <h1 className="text-3xl font-bold mb-10">
              ¡Bienvenido, {userData && userData.name}!
            </h1>

            <button
              className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-200 mb-4"
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
              className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
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
          </>
        )}
      </div>
     

      <div className="w-full sm:w-3/4 p-4 mt-8 mx-auto my-auto" >
        {shownComponent === "Register Property" && <RegisterProperty user={userData} />
        }
        {shownComponent === "My Properties" && <MyProperties user={userData} />}
        {shownComponent === "Editar Usuario" && <EditUser user={userData} />}
        {shownComponent === "Eliminar Usuario" && <DeleteUser />}
      </div>
   
    </div>
  );
}

export default User;
