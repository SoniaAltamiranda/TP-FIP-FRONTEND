import React, { useEffect, useState, useContext } from "react";
import API_URL from "../../configAPIclever/Url_apiClever";
import { propertiesContext } from "../../context/propertiesContext";
import { useNavigate } from "react-router-dom";

function Payments() {
  const properties = useContext(propertiesContext);
  const [paymentData, setPaymentData] = useState({});
  const [bookingData, setBookingData] = useState(null);
  const [statusBooking, setStatusBooking] = useState(null);
  const [statusProperty, setStatusProperty] = useState(null);
  const [idProperty, setIdProperty] = useState(null);
  const [property, setProperty] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const paymentData = {};
    urlSearchParams.forEach((value, key) => {
      paymentData[key] = value;
    });
    setPaymentData(paymentData);
    (paymentData);

    const dataToSend = {
      payment_id: Number(paymentData.payment_id),
      status: paymentData.status,
      payment_type: paymentData.payment_type,
      merchant_order_id: Number(paymentData.merchant_order_id),
      id_preference: paymentData.preference_id,
      processing_mode: paymentData.processing_mode,
    };

    const token = localStorage.getItem('token')

    const fetchPaymentData = async () => {
      try {
        const response = await fetch(`${API_URL}/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(dataToSend),
        });
        if (response.ok) {
          ("Se guardaron los datos el pago");
        }
      } catch (error) {
        (`Error al cargar los datos` + error);
      }
    };

    const fetchBookingData = async () => {
      try {
        const preferenceId = paymentData["preference_id"];
        if (!preferenceId) return;

        const response = await fetch(
          `${API_URL}/booking/byPreference/${preferenceId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch booking data");
        }

        const data = await response.json();
        setBookingData(data);

        if (data && data.id_property) {
          setIdProperty(data.id_property);
          const foundProperty = properties.find(
            (property) => property.id_property === data.id_property
          );
          setProperty(foundProperty);
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchPaymentData();
    fetchBookingData();
  }, [properties]);

  const handleBackToHome = () => {
    navigate("/user");
  };

  useEffect(() => {
    const updateBookingStatus = async (bookingId) => {
      const token = localStorage.getItem("token");
      try {
        const updatedBookingData = { ...bookingData, status: statusBooking };
        const response = await fetch(`${API_URL}/booking/${bookingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedBookingData),
        });
        if (!response.ok) {
          throw new Error("Error updating booking status", error);
        }
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    };

    const updatePropertyStatus = async (propertyId) => {
      try {
        (propertyId);
        const token = localStorage.getItem("token");

        if (!property) {
          console.error("Property is null or undefined");
          return;
        }
        (property);
        (statusProperty);
        const updatedPropertyData = {
          ...property,
          status: statusProperty,
          price: Number(property.price),
          rooms: Number(property.rooms),
        };
        const response = await fetch(`${API_URL}/property/${propertyId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedPropertyData),
        });
        if (!response.ok) {
          throw new Error("Error updating property status");
        }
      } catch (error) {
        console.error("Error updating property status:", error);
      }
    };

    if (paymentData.status === "approved") {
      setStatusBooking(true);
      setStatusProperty("reserved");

      if (bookingData?.id_booking) {
        updateBookingStatus(bookingData.id_booking);
      }

      if (idProperty) {
        updatePropertyStatus(idProperty);
      }
    }
  }, [
    paymentData.status,
    bookingData,
    idProperty,
    property,
    statusBooking,
    statusProperty,
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 mt-28">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {paymentData.status === "approved" ? (
          <div className="text-center">
            <img
              src="/images/lista-de-verificacion.png"
              alt="Pago aprobado"
              className="mx-auto mb-4 w-32 h-32"
            />
            <h2 className="text-2xl font-semibold mb-4">
              Su pago fué EXITOSO.
            </h2>
            {bookingData && (
              <div>
                <div className="flex justify-center flex-wrap -m-2">
                  {property.images.map((image, index) => (
                    <div key={index} className="p-2 w-1/2">
                      <img
                        src={image}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Datos de la Reserva</h3>
                  <h5 className="text-md font-semibold">{property.title}</h5>
                  <p>
                    Fecha de entrada:{" "}
                    {new Date(bookingData.date_init).toLocaleDateString()}
                  </p>
                  <p>
                    Fecha de salida:{" "}
                    {new Date(bookingData.date_finish).toLocaleDateString()}
                  </p>
                </div>
                <div className="mb-4">
                  <h5 className="text-md font-semibold">
                    Datos del Propietario
                  </h5>
                  <p>Nombre: {property.user.name}</p>
                  <p>Email: {property.user.email}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <img
              src="/images/rechazado.png"
              alt="Pago rechazado"
              className="mx-auto mb-4 w-32 h-22"
            />
            <h2 className="text-2xl font-semibold mb-4">
              Su pago fue rechazado.!!!
            </h2>
            <p>
              Por favor, intente nuevamente mas tarde o comuniquese con la
              entidad de pago que está seleccionando.
            </p>
            <p>Gracias!</p>
          </div>
        )}
        <div className="flex justify-center">
          <button
            onClick={handleBackToHome}
            className="mt-8 bg-gray-700 text-white hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Volver a Mi Cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payments;
