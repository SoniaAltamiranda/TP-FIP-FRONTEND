import { useState, useContext } from "react";
import { propertiesContext } from "../../context/propertiesContext";
import { Link } from "react-router-dom";
import RentalFilter from "../rentals/Rental.Filter";

function PermanentRentals() {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const properties = useContext(propertiesContext);
  const propertiesPerPage = 3;

  const filteredProperties = properties.filter((property) => {
    if (filter === "") {
      return true;
    } else {
      return property.type === filter;
    }
  });

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300">
      <br />
      <div className="mt-24 container mx-auto">
      <div className="text-center md:text-left mb-10 md:flex md:items-center justify-center mx-2">
            <div>
              <h1 className="text-center text-3xl md:text-6xl text-gray-600 font-extrabold mb-2">
                ALQUILAFÁCIL.COM
              </h1>
              <hr className="w-1/4 md:w-1/6 border-t-2 border-gray-300 mx-auto mb-4" />
              <p className="text-base text-center md:text-lg text-gray-500">
                La forma más conveniente de alquilar lo que necesitas.
              </p>
            </div>
          </div>
        <RentalFilter onChange={(e) => setFilter(e.target.value)} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProperties.map((property) => (
            <div key={property.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[550px]">
                <img
                  src={`${property.images[0]}`}
                  alt="Imagen de propiedad"
                  className="w-full h-[270px] object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                    {property.title}
                  </h2>
                  <p className="text-gray-600 mb-2">{property.description}</p>
                  <p className="text-gray-700 mb-2">Precio: ${property.price}</p>
                  <p className="text-gray-700 mb-2">
                    Ubicación: {property?.location.city}, {property?.location.state},{" "}
                    {property?.location.country}
                  </p>
                  <p className="text-gray-700 mb-2">Tipo: {property.type}</p>
                  <div className="mt-4 text-center">
                    <Link
                      to={`/rentals/${property.id_property}`}
                      state={{ property }}
                      className="inline-block bg-gray-700 text-white py-2 px-4 rounded-full hover:bg-gray-800 mx-auto"
                    >
                      Ver más...
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-4">
          {currentPage > 1 && (
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
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
    </div>
  );
}

export default PermanentRentals;
