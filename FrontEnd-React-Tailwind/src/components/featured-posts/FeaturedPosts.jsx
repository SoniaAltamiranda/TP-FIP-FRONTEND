import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { propertiesContext } from "../../context/propertiesContext";

function FeaturedPosts() {
  const properties = useContext(propertiesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPageLarge = 6; // Mostrar 6 propiedades por página en pantallas grandes
  const propertiesPerPageSmall = 3; // Mostrar 3 propiedades por página en pantallas pequeñas


  const propertiesPerPage = window.innerWidth >= 640 ? propertiesPerPageLarge : propertiesPerPageSmall;


  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="sm:flex-1">
        <h1 className="text-2xl font-semibold text-center mb-4">Destacados</h1>
        <hr className="mb-4" />
        {currentProperties.map((property) => (
          <div
            key={property.id_property}
            className="flex flex-col sm:flex-row p-4 border rounded-lg shadow-md mb-4"
          >
            <div className="sm:w-1/4 mb-4 sm:mb-0 sm:mr-4">
              <div className="person-image-container">
                <div className="person-image relative">
                  <img
                    src={property.images[0]}
                    alt="Property Image"
                    className="object-cover w-full h-40 rounded-t-lg rounded-b-lg"
                  />
                </div>
              </div>
            </div>
            <div className="sm:w-3/4">
              <h4 className="text-xl font-semibold mb-2">{property.title}</h4>
              <p className="text-gray-600 mb-4">{property.description}</p>
              <div className="text-center">
                <Link
                  to={`/rentals/${property.id_property}`}
                  state={{ property }}
                  className="inline-block bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-full"
                >
                  Ver más...
                </Link>
              </div>
            </div>
          </div>
        ))}
        
      
        <div className="flex justify-center items-center mt-4 sm:hidden">
          {currentPage > 1 && (
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              onClick={() => paginate(currentPage - 1)}
            >
              {"< "}
            </button>
          )}
          {currentProperties.length === propertiesPerPage && (
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => paginate(currentPage + 1)}
            >
              {" >"}
            </button>
          )}
        </div>
      </div>

  
      <div className="sm:w-1/3 hidden sm:block">
        <img
          src="/images/banner pagina.png"
          alt="Texto alternativo de la imagen"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default FeaturedPosts;
