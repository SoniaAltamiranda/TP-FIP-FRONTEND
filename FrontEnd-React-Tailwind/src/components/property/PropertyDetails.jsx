import { useLocation } from "react-router-dom";

function PropertyDetails() {
  const location = useLocation();
  const { property } = location.state;

  return (
    <div className="container mx-auto p-4 mt-16 text-gray-600">
      <div className="text-center"> {/* Centrar el contenido */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{property.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Imágenes */}
          {property.images.map((image, index) => (
            <div key={index} className="mb-4">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          ))}

       
        
<div className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{property.title}</h2>
          <p className="mb-2">Rooms: <span className="text-gray-500">{property.rooms}</span></p>
          <p className="mb-2">Description: {property.description}</p>
          <p className="mb-2">Price: <span className="text-green-500">${property.price}</span></p>
          <p className="mb-2">Location: {property.location}</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
