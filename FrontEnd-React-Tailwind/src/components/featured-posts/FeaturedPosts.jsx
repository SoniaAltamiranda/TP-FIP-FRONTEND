import React from "react";
import { useContext } from "react";
import { propertiesContext } from "../../context/propertiesContext";
import { Link } from "react-router-dom";

function FeaturedPosts() {
  const properties = useContext(propertiesContext);

  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="flex">
      <div className="flex-1">
        {featuredProperties.map((property) => (
          <div key={property.id} className="flex p-4">
            <div className="w-1/4">
              <div className="person-image-container">
                <div className="person-image">
                  <img
                    src={`${property.images[0]}`}
                    alt="Avatar"
                    className="object-cover w-full h-40"
                  />
                </div>
              </div>
            </div>
            <div className="w-3/4 p-4">
              <h4 className="text-xl font-semibold">{property.title}</h4>
              <p className="text-gray-600">{property.description}</p>
              <div className="text-center mt-4">
                <Link
                  to={`/rentals/${property.id}`} // Asegúrate de que coincida con la ruta en App.js
                  state={{ property }} // Esto pasa la propiedad como estado
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 mx-auto"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-1/4 bg-red-500">Banner</div>
    </div>
  );
}

export default FeaturedPosts;
