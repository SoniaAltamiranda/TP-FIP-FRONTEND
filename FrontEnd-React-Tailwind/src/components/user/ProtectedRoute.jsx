// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { currentUser, getCurrentUser } = useAuth();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         await getCurrentUser(); // usuario actual
//         setLoading(false);
//       } catch (error) {
//         console.error("Error al obtener el usuario actual:", error);
//         setLoading(false);
//       }
//     };

//     fetchCurrentUser();
//   }, [getCurrentUser]);

//   if (loading) {
   
//     return <div>Cargando...</div>;
//   }

//   return currentUser ? (
//     <Component {...rest} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
//   return isAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default ProtectedRoute;
// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const ProtectedRoute = ({ element, ...props }) => {
//   const { authenticated } = useAuth();

//   return authenticated ? <Route {...props} element={element} /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;
