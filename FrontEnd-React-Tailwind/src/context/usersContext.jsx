import { createContext, useEffect, useState } from "react";

export const usersContext = createContext({});

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const url = "http://localhost:3000/users";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
      });
  }, []);

  return (
    <usersContext.Provider value={{ users, currentUser, setCurrentUser }}>
      {children}
    </usersContext.Provider>
  );
};
