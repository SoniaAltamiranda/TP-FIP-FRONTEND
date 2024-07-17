import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import API_URL from "../../configAPIclever/Url_apiClever";
import { useLocation, useParams } from "react-router-dom";
import BookingForm from "./BookingForm";

function PropertyDetails() {
  const location = useLocation();
  const { id } = useParams();
  const [property, setProperty] = useState(location.state?.property);
  const [ownerEmail, setOwnerEmail] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [open, setOpen] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (!property) {
      fetchProperty();
    } else if (property.id_user) {
      fetchOwnerEmail(property.id_user);
    } else {
      console.error("No se encontró id_user en los datos de la propiedad");
    }

    fetchReservations();
  }, [id, property]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserLoggedIn(!!token);
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await fetch(`${API_URL}/property/${id}`);
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

  const fetchOwnerEmail = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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

  const fetchReservations = async () => {
    try {
      const response = await fetch(`${API_URL}/booking?propertyId=${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Datos de las reservas:", data);
        setReservations(data);
      } else {
        throw new Error("Fallo al obtener las reservas de la propiedad");
      }
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
    }
  };

  const handleContactClick = () => {
    if (userLoggedIn) {
      const mailtoLink = `mailto:${ownerEmail}?subject=Interesado%20en%20${property.title}&body=Hola,%0D%0A%0D%0AEstoy%20interesado%20en%20su%20propiedad%20${property.title}.%20Por%20favor,%20p%C3%B3ngase%20en%20contacto%20conmigo%20para%20obtener%20m%C3%A1s%20informaci%C3%B3n.%0D%0A%0D%0AGracias.`;
      window.location.href = mailtoLink;
    } else {
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión",
        text: "Debes iniciar sesión para poder contactar al propietario.",
        showCancelButton: true,
        confirmButtonText: "Iniciar Sesión",
        confirmButtonColor: "#2C3E50",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#5D6D7E",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }
  };

  const handleReserveClick = () => {
    if (userLoggedIn) {
      setOpen(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión",
        text: "Debes iniciar sesión para poder reservar.",
        showCancelButton: true,
        confirmButtonText: "Iniciar Sesión",
        confirmButtonColor: "#2C3E50",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#5D6D7E",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300">
      <div className=" bg-gradient-to-b from-gray-100 to-gray-300 text-center container mx-auto p-2 mt-8 text-gray-600">
        <div className="text-center container mx-auto p-4 mt-18 text-gray-600">
          <div className="container mx-auto p-4 mt-14 text-gray-600">
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

              <div className="md:col-span-2 p-4 bg-gray-100 border rounded shadow-lg">
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {property?.title}
                  </h2>
                  <p className="mb-2">
                    Habitaciones:{" "}
                    <span className="text-gray-500">{property?.rooms}</span>
                  </p>
                  <p className="mb-2">Descripción: {property?.description}</p>
                  <p className="mb-2">
                    Precio:{" "}
                    <span className="font-bold text-gray-700">
                      ${property?.price}
                    </span>
                  </p>
                  <p className="mb-2">
                    Ubicación: {property?.location.city},{" "}
                    {property?.location.state}, {property?.location.country}
                  </p>

                 

                  {property.type === "Alquiler temporal" && (
                    <button
                      onClick={handleReserveClick}
                      className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
                    >
                      Seleccionar Fecha
                    </button>
                  )}
                  {property.type === "Alquiler a largo plazo" && (
                    <>
                      <p className="mb-4 text-red-gray-800">
                        Contacta con el propietario para obtener más detalles
                        sobre alquileres a largo plazo.
                      </p>
                      <button
                        onClick={handleContactClick}
                        className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 mb-4"
                      >
                        Contactar al Propietario
                      </button>
                    </>
                  )}
                  {open && (
                    <BookingForm
                      property={property}
                      open={open}
                      onClose={() => setOpen(false)}
                      onBookingSuccess={() => {
                        console.log("¡Reserva exitosa!");
                        setOpen(false);
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="md:col-span-1 p-4 bg-gray-100 border rounded shadow-lg">
                <iframe
                  title="Ejemplo de Marco en Línea"
                  width="100%"
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
