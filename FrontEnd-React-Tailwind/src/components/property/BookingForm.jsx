import React, { useState } from 'react';
import DatePicker from "react-datepicker";

function BookingForm() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBooking = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date_init: startDate,
          date_finish: endDate,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Error al realizar la reserva');
      }


      console.log(await response.json());
    } catch (error) {
      setError(error.message || 'Error al realizar la reserva');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        startDate={startDate}
        endDate={endDate}
        selectsStart
        placeholderText="Fecha de inicio"
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        selectsEnd
        placeholderText="Fecha de fin"
      />
      <button onClick={handleBooking} disabled={!startDate || !endDate || loading}>
        {loading ? 'Reservando...' : 'Reservar'}
      </button>
      {error && <div>{error}</div>}
    </div>
  );
}

export default BookingForm;