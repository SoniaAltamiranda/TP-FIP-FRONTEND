import React, { useState } from "react";
import Swal from "sweetalert2";
import API_URL from "../../configAPIclever/Url_apiClever";

function ModifyProperty({ property, locationsData, setIsEditing }) {
    const [propertyToEdit, setPropertyToEdit] = useState(property);
    const [selectedLocation, setSelectedLocation] = useState(property.id_location);

    console.log(propertyToEdit);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const updatedProperty = {
                ...propertyToEdit,
                id_location: Number(selectedLocation),
                rooms: Number(propertyToEdit.rooms),
                price: Number(propertyToEdit.price),
            };
            const response = await fetch(`${API_URL}/property/${propertyToEdit.id_property}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedProperty),
            });
            if (response.ok) {
                setIsEditing(false);
               /* setProperties(
                    properties.map((prop) =>
                        prop.id_property === propertyToEdit.id_property ? updatedProperty : prop
                    )
                );*/
                Swal.fire({
                    title: "Éxito",
                    text: "La propiedad se ha actualizado correctamente",
                    icon: "success",
                });
            } else {
                const responseData = await response.json();
                console.error("Error en la respuesta:", response.status, response.statusText);
                console.error("Datos de la respuesta:", responseData);
                throw new Error("Error al actualizar la propiedad");
            }
        } catch (error) {
            console.error("Error al actualizar la propiedad:", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un error al actualizar la propiedad. Por favor, inténtalo de nuevo más tarde.",
                icon: "error",
            });
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
                <form onSubmit={handleUpdate} className="space-y-4">
                    <h2 className="text-2xl font-bold">Datos de la propiedad:</h2>
                    <div>
                        <label htmlFor="title" className="block text-gray-800 font-bold mb-1">
                            Título:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={propertyToEdit.title}
                            onChange={(e) => setPropertyToEdit({ ...propertyToEdit, title: e.target.value })}
                            className="border border-gray-400 p-2 rounded w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-800 font-bold mb-1">
                            Descripción:
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={propertyToEdit.description}
                            onChange={(e) => setPropertyToEdit({ ...propertyToEdit, description: e.target.value })}
                            className="border border-gray-400 p-2 rounded w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="rooms" className="block text-gray-800 font-bold mb-1">
                            Ambientes:
                        </label>
                        <input
                            type="number"
                            id="rooms"
                            name="rooms"
                            value={propertyToEdit.rooms}
                            onChange={(e) => setPropertyToEdit({ ...propertyToEdit, rooms: e.target.value })}
                            className="border border-gray-400 p-2 rounded w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-gray-800 font-bold mb-1">
                            Precio:
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={propertyToEdit.price}
                            onChange={(e) => setPropertyToEdit({ ...propertyToEdit, price: e.target.value })}
                            className="border border-gray-400 p-2 rounded w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-gray-800 font-bold mb-1">
                            Ubicación:
                        </label>
                        <select
                            id="location"
                            name="location"
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="border border-gray-400 p-2 rounded w-full"
                        >
                            {locationsData.map((location) => (
                                <option key={location.id_location} value={location.id_location}>
                                    {location.city}, {location.state}, {location.country}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModifyProperty;
