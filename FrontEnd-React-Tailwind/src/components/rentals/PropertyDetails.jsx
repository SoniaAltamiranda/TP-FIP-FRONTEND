import { useLocation } from "react-router-dom";

function PropertyDetails() {
  const location = useLocation();
  const { property } = location.state;

  return (
    <div className="container mx-auto p-4 mt-16">
      <h2 className="text-2xl font-semibold mb-4">{property.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Imágenes */}
        {property.images.map((image, index) => (
          <div key={index} className="mb-4">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}

        {/* Datos */}
        <div className="md:col-span-2">
          <p>Type: {property.type}</p>
          <p>Rooms: {property.rooms}</p>
          <p>Description: {property.description}</p>
          <p>Price: ${property.price}</p>
          <p>Location: {property.location}</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
