import React, { useEffect, useState } from "react";
import API_URL from "../../configAPIclever/Url_apiClever";
import Swal from "sweetalert2";

const MyBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/booking`);
        if (!response.ok) {
          throw new Error("Error al obtener las reservas");
        }
        const data = await response.json();

        const userBookings = data.filter(
          (booking) =>
            booking.id_user === user.id_user && booking.status === true
        );
        setBookings(userBookings);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.id_user]);

  const token = localStorage.getItem("token");
  const deleteReservation = async (reservationId) => {
    try {
      const response = await fetch(`${API_URL}/booking/${reservationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedBookings = bookings.filter(
          (booking) => booking.id_booking !== reservationId
        );
        setBookings(updatedBookings);
        `Reserva ${reservationId} eliminada correctamente.`;
        Swal.fire(
          "Reserva cancelada",
          "La reserva ha sido cancelada correctamente.",
          "success"
        );
      } else {
        throw new Error("Fallo al eliminar la reserva");
      }
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      Swal.fire(
        "Error",
        "Hubo un problema al intentar cancelar la reserva.",
        "error"
      );
    }
  };

  const handleCancelBooking = (bookingId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cancelar esta reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2C3E50",
      cancelButtonColor: "#5D6D7E",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReservation(bookingId);
      }
    });
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-gray-800 text-3xl text-center border-b border-gray-600 mb-4">
        Mis Reservas
      </h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-800 mt-4">
          Aún no has hecho reservas. Dirígete a la sección de alquileres y verás
          todas las propiedades disponibles.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                  Propiedad
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                  Fecha de entrada
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                  Fecha de salida
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                  Imagen
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id_booking}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {booking.property.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(booking.date_init).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(booking.date_finish).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <img
                      src={booking.property.images[0]}
                      alt="Property image 1"
                      className="w-32 h-32 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                      onClick={() => handleCancelBooking(booking.id_booking)}
                    >
                      Cancelar reserva
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
