import { useState, useContext } from "react";
import { propertiesContext } from "../../context/propertiesContext";
import { Link } from "react-router-dom";
import RentalFilter from "../rentals/Rental.Filter";

function PermanentRentals() {
  const [filter, setFilter] = useState("");
  const properties = useContext(propertiesContext);

  const filteredProperties = properties.filter((property) => {
    if (filter === "") {
      return true;
    } else {
      return property.type === filter;
    }
  });

  return (
    <div className="bg-gray-100">
    
      <div className="mt-20 container mx-auto">
        <br />
        <h1 className="text-3xl font-semibold text-center mb-8">Alquileres</h1>
        <RentalFilter onChange={(e) => setFilter(e.target.value)} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.map((property) => (
            <div key={property.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[470px]">
                <img
                  src={`${property.images[0]}`}
                  alt="Imagen de propiedad"
                  className="w-full h-[200px] object-cover"
                />
                <div
                  className="p-4"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {property.title}
                  </h2>
                  <p className="text-gray-600">{property.description}</p>
                  <p className="text-gray-600">Precio: ${property.price}</p>
                  <p className="text-gray-600">Tipo: {property.type}</p>
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
      </div>
    </div>
  );
}

export default PermanentRentals;
