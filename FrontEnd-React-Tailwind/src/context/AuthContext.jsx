
import React, { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
 
//   function getUserDataFromToken(token: string): UserData {
//     const payload = decodeToken(token) as UserData | null;

//     if (!payload) {
//         throw new Error();
//     }

//     return payload
// }

 
  const login = (authToken) => {
    console.log("Token almacenado:", authToken); // verifico si está el token
    setToken(authToken);
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
