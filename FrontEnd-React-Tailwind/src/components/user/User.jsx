import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import RegisterProperty from "../property/RegisterProperty";
import MyProperties from "../property/MyProperties";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function User() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [shownComponent, setShownComponent] = useState("");
  const [menuExpanded, setMenuExpanded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const payload = jwtDecode(token);

        const response = await fetch(
          `https://app-911c1751-2ae2-4279-bd11-cb475df87978.cleverapps.io/user/${payload.sub}`,
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
    setMenuExpanded(false);
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
    <div className="h-screen flex flex-col md:flex-row">
      <div
        className={`relative bg-gray-200 text-blue p-6 transition-all duration-500 ${
          menuExpanded ? "w-full md:w-1/4" : "w-full md:w-16"
        }`}
      >
        <div className="relative flex items-center justify-center h-full">
          <button
            className="absolute top-4 right-4 md:top-20 md:right-0 md:mr-2 md:mt-2 text-blue focus:outline-none"
            onClick={() => setMenuExpanded(!menuExpanded)}
          >
            <FontAwesomeIcon
              icon={menuExpanded ? faChevronLeft : faChevronRight}
              size="2x"
            />
          </button>

          {menuExpanded && (
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 w-full transition-height duration-500 ease-in-out h-auto">
              {loading ? (
                <p>Cargando...</p>
              ) : (
                <>
                  <div>
                    <h1 className="w-full flex justify-center items-center text-xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-8">
                      ALQUILAFÁCIL.COM
                    </h1>
                    <hr />
                    <br />
                  </div>
                  <div className="my-2 md:my-4">
                    <button
                      className="w-full bg-gray-700 text-white py-2 md:py-4 rounded-md hover:bg-gray-600 focus:outline-none"
                      onClick={() => handleShowComponent("Register Property")}
                    >
                      Publicar
                    </button>
                  </div>
                  <div className="my-2 md:my-4">
                    <button
                      className="w-full bg-gray-700 text-white py-2 md:py-4 rounded-md hover:bg-gray-600 focus:outline-none"
                      onClick={() => handleShowComponent("My Properties")}
                    >
                      Mis Publicaciones
                    </button>
                  </div>
                  <div className="my-2 md:my-4">
                    <button
                      className="w-full bg-gray-700 text-white py-2 md:py-4 rounded-md hover:bg-gray-600 focus:outline-none"
                      onClick={() => handleShowComponent("Editar Usuario")}
                    >
                      Editar Mis Datos
                    </button>
                  </div>
                  <div className="my-2 md:my-4">
                    <button
                      className="w-full bg-gray-700 text-white py-2 md:py-4 rounded-md hover:bg-gray-600 focus:outline-none"
                      onClick={() => handleShowComponent("Eliminar Usuario")}
                    >
                      Eliminar Mi Cuenta
                    </button>
                  </div>
                  <div className="my-2 md:my-4">
                    <button
                      className="w-full bg-gray-700 text-white py-2 md:py-4 rounded-md hover:bg-gray-600 focus:outline-none"
                      onClick={handleLogout}
                    >
                      Salir
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 mb-16 md:mb-0">
        {shownComponent === "" ? (
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold">
              ¡Bienvenido, {userData && userData.name}!
            </h1>
            <p className="text-lg md:text-xl mt-4">
              Selecciona una opción del menú para comenzar.
            </p>
          </div>
        ) : null}
        {shownComponent === "Register Property" && (
          <div className="w-full max-w-4xl">
            <RegisterProperty user={userData} />
          </div>
        )}
     {shownComponent === "My Properties" && (
          <div className="flex-grow w-full max-w-4xl overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex-grow overflow-y-auto">
                <MyProperties user={userData} />
              </div>
            </div>
          </div>
        )}


      
        {shownComponent === "Editar Usuario" && (
          <div className="w-full max-w-4xl">
            <EditUser user={userData} />
          </div>
        )}
        {shownComponent === "Eliminar Usuario" && (
          <div className="w-full max-w-4xl">
            <DeleteUser />
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
