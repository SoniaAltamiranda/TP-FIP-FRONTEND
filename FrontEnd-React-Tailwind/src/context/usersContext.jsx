// import React, { createContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";

// export const UsersContext = createContext();

// export const UsersProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         if (!token) {
//           setLoading(false);
//           return;
//         }

//         const headers = {
//           Authorization: `Bearer ${token}`
//         };

//         const response = await fetch("http://localhost:3000/user", { headers });
//         if (!response.ok) {
//           throw new Error("Error al obtener los datos del usuario");
//         }

//         const userData = await response.json();
//         setCurrentUser(userData);
        
//         setLoading(false);
//       } catch (error) {
//         console.error("Error al obtener los datos del usuario:", error);
//         setLoading(false);
//       }
//     };

//     fetchCurrentUser();
//   }, [token]); 

//   if (loading) {
//     return <div>Cargando...</div>;
//   }

//   return (
//     <UsersContext.Provider value={{ currentUser }}>
//       {children}
//     </UsersContext.Provider>
//   );
// }; 
