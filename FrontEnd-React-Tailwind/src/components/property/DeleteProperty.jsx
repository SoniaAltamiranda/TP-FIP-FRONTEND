import { useState } from "react";
import Swal from "sweetalert2";

function DeleteProperty() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [showRetry, setShowRetry] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/property/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("El inmueble se ha eliminado correctamente");
        showSuccessAlert();
      } else {
        setMessage("Error al eliminar el inmueble");
        setShowRetry(true);
        showErrorAlert();
      }
    } catch (error) {
      console.error("Error al eliminar el inmueble:", error);
      setMessage("Error al eliminar el inmueble");
      setShowRetry(true);
      showErrorAlert();
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Éxito",
      text: "El inmueble se ha eliminado correctamente",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.href = "http://localhost:5173/user";
    });
  };

  const showErrorAlert = () => {
    Swal.fire({
      title: "Error",
      text: "Error al eliminar el inmueble",
      icon: "error",
      showCancelButton: true, 
      confirmButtonText: "Reintentar",
      cancelButtonText: "Salir", 
    }).then((result) => {
      if (result.isConfirmed) {
        
        handleRetry();
      } else {
        
        window.location.href = "http://localhost:5173/user";
      }
    });
  };

  const handleRetry = () => {
    setMessage("");
    setShowRetry(false);
    setId("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-3/4 p-2 bg-white rounded-lg shadow-md">
        <h1>Indique el ID del inmueble para eliminarlo:</h1>
        {showRetry ? (
          <div>
            <p className="text-red-500">{message}</p>
            <button
              onClick={handleRetry}
              className="bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mr-2"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="id" className="block text-gray-800 font-bold mb-1">
                ID del Inmueble:
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Eliminar Inmueble por ID
              </button>
            </div>
            {message && (
              <div className="text-center mt-2 text-gray-800">{message}</div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default DeleteProperty;