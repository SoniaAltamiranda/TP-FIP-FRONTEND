import React from "react";
import Swal from "sweetalert2";
import API_URL from "../../configAPIclever/Url_apiClever";

function DeleteProperty({ property, setIsDeleting }) {
    const handleDeleteProperty = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(property.id_property);
           
            const response = await fetch(`${API_URL}/property/${property.id_property}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setIsDeleting(false); 
                Swal.fire({
                    title: "Éxito",
                    text: "La propiedad se ha eliminado correctamente",
                    icon: "success",
                });
            } else {
                throw new Error("Error al eliminar la propiedad");
            }
        } catch (error) {
            console.error("Error al eliminar la propiedad:", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un error al eliminar la propiedad. Por favor, inténtalo de nuevo más tarde.",
                icon: "error",
            });
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
                <h2 className="text-2xl font-bold">Eliminar propiedad:</h2>
                <p className="text-gray-800 mt-2">
                    ¿Estás seguro que deseas eliminar la propiedad "{property.title}"?
                </p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleDeleteProperty}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={() => setIsDeleting(false)}
                        className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteProperty;

