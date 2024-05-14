import { useContext } from "react";
import { propertiesContext } from "../../context/propertiesContext";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
function PermanentRentals() {
  const properties = useContext(propertiesContext);


  return (
    <div className="bg-gray-100">
      <Navbar className="fixed top-0 left-0 right-0" />
      <div className="mt-20 container mx-auto">
        <br />
        <h1 className="text-3xl font-semibold text-center mb-8">Alquileres Permanentes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties && properties.map((property) => (
            <div key={property.id_property}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[470px]">
                <img
                  
                   src={property.images?.[0] || "placeholder.jpg"} // 
                   alt="Imagen de propiedad"
                   className="w-full h-[200px] object-cover"
                 />
        
                <div className="p-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  <h4 className="text-2xl font-semibold mb-2 text-gray-500">{property.title}</h4>
                  <p className="text-gray-600 text-sm">{property.description}</p>
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

