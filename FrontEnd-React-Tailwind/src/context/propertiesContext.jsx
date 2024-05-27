import { createContext, useEffect, useState } from "react";

export const propertiesContext = createContext();

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:3000/property";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProperties(data);
          setLoading(false);
        } else {
          throw new Error('No se pudo obtener la lista de propiedades');
        }
      } catch (error) {
        console.error('Error al obtener la lista de propiedades:', error);
        setLoading(false);
      }
    };

    fetchData();
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
