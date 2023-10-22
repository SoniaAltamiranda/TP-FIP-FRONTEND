import { createContext, useEffect, useState } from "react";

export const propertiesContext = createContext({});

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:3000/properties";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((properties) => {
        setProperties(properties);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <propertiesContext.Provider value={properties}>
      {children}
    </propertiesContext.Provider>
  );
};
