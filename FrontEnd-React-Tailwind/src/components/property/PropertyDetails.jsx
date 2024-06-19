//   initMercadoPago('APP_USR-54003e8a-4ee5-4796-a64b-bd2701051885'

// Componente    <Route path="/rentals/:id" element={<PropertyDetails />} />
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import BookingForm from "./BookingForm";

function PropertyDetails() {
  const location = useLocation();
  const { id } = useParams();
  const [property, setProperty] = useState(location.state?.property);
  const [ownerEmail, setOwnerEmail] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!property) {
      const fetchProperty = async () => {
        try {
          const response = await fetch(`http://localhost:3000/properties/${id}`);
          if (response.ok) {
            const data = await response.json();
            console.log("Datos de la propiedad:", data); 
            setProperty(data);
            if (data.id_user) {
              fetchOwnerEmail(data.id_user);
            } else {
              console.error("No se encontró id_user en los datos de la propiedad");
            }
          } else {
            throw new Error("Fallo al obtener los datos de la propiedad");
          }
        } catch (error) {
          console.error("Error al obtener la propiedad:", error);
        }
      };
      fetchProperty();
    } else if (property.id_user) {
      fetchOwnerEmail(property.id_user); 
    } else {
      console.error("No se encontró id_user en los datos de la propiedad");
    }
  }, [id, property]);

  const fetchOwnerEmail = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Datos del propietario:", data); 
        setOwnerEmail(data.email);
      } else {
        throw new Error("Fallo al obtener los datos del propietario");
      }
    } catch (error) {
      console.error("Error al obtener los datos del propietario:", error);
    }
  };

  const handleContactClick = () => {
    const mailtoLink = `mailto:${ownerEmail}?subject=Interesado%20en%20${property.title}&body=Hola,%0D%0A%0D%0AEstoy%20interesado%20en%20su%20propiedad%20${property.title}.%20Por%20favor,%20p%C3%B3ngase%20en%20contacto%20conmigo%20para%20obtener%20m%C3%A1s%20informaci%C3%B3n.%0D%0A%0D%0AGracias.`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="container mx-auto p-4 mt-16 text-gray-600">
      <div className="text-center">
        <br />
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {property?.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {property?.images &&
            property.images.map((image, index) => (
              <div key={index} className="mb-4">
                <img
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            ))}

          <div className="md:col-span-4 p-4 bg-gray-100 border rounded shadow-lg flex justify-center items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {property?.title}
              </h2>
              <p className="mb-2">
                Habitaciones: <span className="text-gray-500">{property?.rooms}</span>
              </p>
              <p className="mb-2">Descripción: {property?.description}</p>
              <p className="mb-2">
                Precio:{" "}
                <span className="font-bold text-gray-700">
                  ${property?.price}
                </span>
              </p>
              <p className="mb-2">
                Ubicación: {property?.location.city}, {property?.location.state},{" "}
                {property?.location.country}
              </p>
              {ownerEmail ? (
                <>
                  <p className="mb-2">
                    Correo del Propietario:{" "}
                    <span className="text-gray-500">{ownerEmail}</span>
                  </p>
                  <button
                    onClick={handleContactClick}
                    className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
                  >
                    Contactar al Propietario
                  </button>
                </>
              ) : (
                <p>Cargando información del propietario...</p>
              )}
              {!userLoggedIn && (
                <>
                  {/* <p className="mb-2">
                    Para obtener más información, por favor{" "}
                    <a href="/Login" className="text-blue-500 hover:underline">
                      HAZ CLICK AQUÍ
                    </a>
                    .
                  </p> */}
                  <button
                    onClick={() => setOpen(true)} 
                    className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
                  >
                    Seleccionar Fecha
                  </button>
                  {open && (
                    <BookingForm
                      property={property}
                      open={open}
                      onClose={() => setOpen(false)} 
                      onBookingSuccess={() =>
                        console.log("¡Reserva exitosa!")
                      }
                    />
                  )}
                </>
              )}
              <div>
                <iframe
                  id="inlineFrameExample"
                  title="Ejemplo de Marco en Línea"
                  width="600"
                  height="250"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
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
