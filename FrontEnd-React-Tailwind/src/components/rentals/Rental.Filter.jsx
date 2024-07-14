import React from "react";

function RentalFilter({ onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="rentalType" className="block text-gray-800 text-m font-bold mb-2">
        Filtrar por tipo de alquiler:
      </label>
      <select
        id="rentalType"
        name="rentalType"
        onChange={onChange}
        className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
      >
        <option value="">Todos</option>
        <option value="Alquiler temporal">Alquiler temporal</option>
        <option value="Alquiler a largo plazo">Alquiler a largo plazo</option>
      </select>
    </div>
  );
}

export default RentalFilter;
  