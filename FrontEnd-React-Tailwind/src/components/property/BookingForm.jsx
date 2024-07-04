import React, { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookingForm({ property, open, onClose, onBookingSuccess }) {
  initMercadoPago("APP_USR-d8001b82-36a4-4f76-bf0e-f88f96b549ae", {
    locale: "es-AR",
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays);
      setTotalPrice(diffDays * property.price);
    } else {
      setTotalDays(0);
      setTotalPrice(0);
    }
  }, [startDate, endDate, property.price]);

  useEffect(() => {
    if (property && property.booking) {
      const dates = property.booking.map(booking => ({
        start: new Date(booking.date_init),
        end: new Date(booking.date_finish)
      }));
      setReservedDates(dates);
    }
  }, [property]);

  const handleBuy = async () => {
    if (!startDate || !endDate) {
      console.error("Start date and end date must be selected");
      return;
    }

    setIsBooking(true);

    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
    try {
      const date = new Date();
      const bookingData = {
        date: date.getTime(),
        date_init: startDate.getTime(),
        date_finish: endDate.getTime(),
        id_property: property.id_property,
        status: true,
        id_preference: id,
      };
      console.log(bookingData);
      const res = await fetch("http://localhost:3000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      if (!res.ok) {
        throw new Error("Failed to create booking");
      }
      console.log("Booking created successfully");
      onBookingSuccess();
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsBooking(false);
    }
  };

  const createPreference = async () => {
    const preferenceData = {
      title: property.title,
      quantity: totalDays,
      unit_price: parseInt(property.price),
    };

    try {
      const response = await fetch("http://localhost:3000/mercado_pago/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferenceData),
      });

      if (!response.ok) {
        throw new Error("Error creating preference: " + response.status);
      }
      const { id } = await response.json();
      return id;
    } catch (error) {
      console.error("Error creating preference:", error);
    }
  };

  const isDateReserved = date => {
    return reservedDates.some(range => date >= range.start && date <= range.end);
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold mb-4">Reservar {property.title}</h2>
          <div className="mb-4">
            <label className="block mb-2">Fecha de inicio</label>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              filterDate={date => !isDateReserved(date)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Fecha de fin</label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              filterDate={date => !isDateReserved(date)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          {totalDays > 0 && (
            <div className="mb-4">
              <p>Total de días: {totalDays}</p>
              <p>Total a pagar: ${totalPrice.toFixed(2)}</p>
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              onClick={handleBuy}
              className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${isBooking && 'cursor-not-allowed'}`}
              disabled={isBooking}
            >
              {isBooking ? 'Procesando...' : 'Reservar'}
            </button>
          </div>
          {preferenceId && (
            <div className="mt-4">
              <Wallet
                initialization={{ preferenceId }}
                customization={{ texts: { valueProp: "smart_option" } }}
              />
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default BookingForm;
