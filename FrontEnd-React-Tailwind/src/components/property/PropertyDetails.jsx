import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function PropertyDetails() {
  const location = useLocation();
  const { property } = location.state;
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <div className="container mx-auto p-4 mt-16 text-gray-600">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {property.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {property.images.map((image, index) => (
            <div key={index} className="mb-4">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>)
          )}

<div className="md:col-span-4 p-4 bg-gray-100 border rounded shadow-lg flex justify-center items-center" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
  <div>
    <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
      {property.title}
    </h2>
    <p className="mb-2">
      Rooms: <span className="text-gray-500">{property.rooms}</span>
    </p>
    <p className="mb-2">Description: {property.description}</p>
    <p className="mb-2">
  Price: <span style={{ fontWeight: 'bold', color: '#555' }}>
    ${property.price}
  </span>
</p>
    <p className="mb-2">Location: {property.location}</p>
    {!userLoggedIn && (
      <p className="mb-2">
        Para obtener más información, por favor{" "}
        <a href="/Login" style={{ textDecoration: 'none', color: '#3498db' }}>
          HAZ CLICK AQUI
        </a>
        .
      </p>
    )}
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
