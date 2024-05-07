import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

function User() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const payload = jwt_decode(token);
        
        setUsername(payload.username);

        const response = await fetch(`http://localhost:3000/user/${payload.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h2>Hola, {username}</h2>
          <p>Correo electrónico: {userData.email}</p>
          {/* Mostrar otros datos del usuario aquí */}
        </div>
      )}
    </div>
  );
}

export default User;






// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import RegisterProperty from "../property/RegisterProperty";
// import MyProperties from "../property/MyProperties";
// import EditUser from "./EditUser";
// import DeleteUser from "./DeleteUser";
// import { useAuth } from "../../context/AuthContext";

// function User() {
//   // const [user, setUser] = useState(null);
//   // const [property, setProperties] = useState([]);
//   // const [userProperties, setUserProperties] = useState([]);
//   // const [shownComponent, setShownComponent] = useState("Register Property");
 
//   const { authenticated } = useAuth();

//   useEffect(() => {
//     if (authenticated) {
//       setUser(JSON.parse(localStorage.getItem("user")));
//     }
//   }, [authenticated]);
  

//   useEffect(() => {
//     setUserProperties(propertiesByUser);
//   }, [user, property]);

//   const propertiesByUser = user
//     ? property.filter((property) => property.id_propietor === user.id)
//     : [];

//   const handleShowComponent = (component) => {
//     setShownComponent(component);
//   };

//   const handleLogout = () => {
//     Swal.fire({
//       title: "¿Estás seguro?",
//       text: "¿Quieres cerrar sesión?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Sí",
//       cancelButtonText: "No",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("user");
//         localStorage.removeItem("property");
//         setUser(null);
//         window.location.href = "/";
//       }
//     });
//   };

//   return (
//     <div className="h-screen flex flex-col sm:flex-row">
//       <div className="flex flex-col justify-center items-center bg-gray-800 text-white pt-6 space-y-12 p-4 sm:w-1/4">
//       <h1 className="text-3xl font-bold mb-10">
//   {user ? `¡Bienvenido, ${user.name}!` : "Por favor inicia sesión para continuar"}
// </h1>


//         <button
//           className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-200 mb-4"
//           onClick={() => handleShowComponent("Register Property")}
//         >
//           Publicar
//         </button>
//         <button
//           className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
//           onClick={() => handleShowComponent("My Properties")}
//         >
//           Mis Publicaciones
//         </button>
//         <button
//           className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
//           onClick={() => handleShowComponent("Editar Usuario")}
//         >
//           Editar mis datos
//         </button>
//         <button
//           className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
//           onClick={() => handleShowComponent("Eliminar Usuario")}
//         >
//           Eliminar mi usuario
//         </button>
//         <button
//           className="w-2/3 bg-gray-700 text-white py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
//           onClick={handleLogout}
//         >
//           Salir
//         </button>
//       </div>

//       <div className="w-full sm:w-3/4 p-4 mt-8 mx-auto my-auto">
//         {shownComponent === "Register Property" && <RegisterProperty user={user} />}
//         {shownComponent === "My Properties" && <MyProperties properties={userProperties} />}
//         {shownComponent === "Editar Usuario" && <EditUser user={user} />}
//         {shownComponent === "Eliminar Usuario" && <DeleteUser />}
//       </div>
//     </div>
//   );
// }

// export default User;

