import { useContext } from "react";
import { propertiesContext } from "../../context/propertiesContext";
import { Link } from "react-router-dom";

function FeaturedPosts() {
  const properties = useContext(propertiesContext);

  const featuredProperties = properties.slice(0, 5);

  return (
    <div className="flex">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-center mb-4">Destacados</h1>
        <hr className="mb-4" />
        {featuredProperties.map((property) => (
          <div
            key={property.id}
            className="flex p-4 border rounded-lg shadow-md mb-4"
          >
            <div className="w-1/4">
              <div className="person-image-container">
                <div className="person-image relative">
                  <img
                    src={property.images && property.images[0]}
                    alt="Property Image"
                    className="object-cover w-full h-40 rounded-t-lg rounded-b-lg"
                  />
                </div>
              </div>
            </div>
            <div className="w-3/4 p-4">
              <h4 className="text-xl font-semibold mb-2">{property.title}</h4>
              <p className="text-gray-600 mb-4">{property.description}</p>
              <div className="text-center">
                <Link
                  to={`/rentals/${property.id}`}
                  state={{ property }}
                  className="inline-block bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-full"
                >
                  Ver más...
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-1/3">
        <img
          src="/images/banner pagina.png"
          alt="Texto alternativo de la imagen"
        />
      </div>
    </div>
  );
}

export default FeaturedPosts;


