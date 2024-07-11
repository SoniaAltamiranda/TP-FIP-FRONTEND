import React, { useEffect, useState } from 'react';
import API_URL from '../../configAPIclever/Url_apiClever';
import Swal from 'sweetalert2';

const MyBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/booking`);
        if (!response.ok) {
          throw new Error('Error al obtener las reservas');
        }
        const data = await response.json();

        const userBookings = data.filter(booking => booking.userId === user.id);
        setBookings(userBookings);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.id]);

  const handleCancelBooking = (bookingId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cancelar esta reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes realizar la lógica para cancelar la reserva, por ejemplo, hacer una solicitud a tu API
        console.log('Reserva cancelada:', bookingId);
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
      <h1 className="text-2xl font-bold mb-4">Mis Reservas</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Propiedad</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Fecha de entrada</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Fecha de salida</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Imagen</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="py-2 px-4 border-b border-gray-200">{booking.property.title}</td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(booking.date_init).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(booking.date_finish).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <img src={booking.property.images[0]} alt="Property image 1" className="w-32 h-32 object-cover rounded" />
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancelar reserva
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;

