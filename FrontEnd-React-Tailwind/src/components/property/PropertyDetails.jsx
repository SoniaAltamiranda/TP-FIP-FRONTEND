import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'



function PropertyDetails() {

  initMercadoPago('APP_USR-d8001b82-36a4-4f76-bf0e-f88f96b549ae', {
    locale: "es-AR"
  });

  const location = useLocation();
  const { property } = location.state;
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null)

  const createPreference = async () => {
    const preferenceData = {
      title: property.title,
      quantity: 1,
      price: property.price

    }
    try {
      const response = await fetch('http://localhost:3070/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preferenceData)
      });

      if (!response.ok) {
        throw new Error('Error creando preferencia: ' + response.status);
      }

      const { id } = await response.json();
      return id;
    } catch (error) {
      console.error('Error creando preferencia:', error);

    }
  }

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  }

  return (
    <div className="container mx-auto p-4 mt-32 text-gray-600">
      <div className="text-center">
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
                Ambientes: <span style={{ fontWeight: 'bold', color: '#555' }} >{property.rooms}</span>
              </p>
              <p className="mb-2"><span style={{ fontWeight: 'bold', color: '#555' }} > {property.description}</span></p>
              <p className="mb-2">
                Precio: <span style={{ fontWeight: 'bold', color: '#555' }}>
                  ${property.price}
                </span>
              </p>
              <p className="mb-2">Localidad: <span style={{ fontWeight: 'bold', color: '#555' }} > {property.location}</span></p>
              <p className="mb-2">
                Tipo de propiedad: <span style={{ fontWeight: 'bold', color: '#555' }}>
                  ${property.type}
                </span>
              </p>
              {!userLoggedIn && (
                <>
                  <p className="mb-2">
                    Para obtener más información, por favor{" "}
                    <a href="/Contact" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>
                      HAZ CLICK AQUI
                    </a>
                    .
                  </p>
                  <button onClick={handleBuy} className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
                  > Reservar </button>
                  {preferenceId && <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}
                  
                </>
              )}
              <div className="md:col-span-4 md:col-start-2 flex items-center justify-center mt-4">
                <iframe
                  src={property.url_iframe}
                  className="w-full h-600"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
