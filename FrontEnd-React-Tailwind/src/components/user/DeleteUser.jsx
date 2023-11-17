import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function DeleteUser() {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    window.location.href = "http://localhost:5173/user";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password } = formData;
    const BASE_URL = "http://localhost:3030/users/";

    try {
      const response = await fetch(
        `${BASE_URL}?name=${name}&password=${password}`
      );
      if (response.ok) {
        const userData = await response.json();
        if (userData.length > 0) {
          const userId = userData[0].id;
          const deleteResponse = await fetch(`${BASE_URL}${userId}`, {
            method: "DELETE",
          });

          if (deleteResponse.ok) {
            Swal.fire({
              icon: "success",
              title: "Usuario eliminado con éxito",
              showConfirmButton: true,
            }).then(() => {
              navigate("/");
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error de autenticación",
            showCancelButton: true,
            confirmButtonText: "Reintentar",
            cancelButtonText: "Salir",
          }).then((result) => {
            if (result.isConfirmed) {
              // Reintento
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              window.location.href = "http://localhost:5173/user";
            }
          });
        }
      } else {
        alert(
          "Error de autenticación. Por favor, inténtalo de nuevo más tarde."
        );
      }
    } catch (error) {
      console.error("Error al realizar la autenticación:", error);
      alert("Error de autenticación. Por favor, inténtalo de nuevo más tarde.");
    }

    setFormData({ name: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-1 border-black p-6 rounded-lg shadow-lg bg-gray-200">
        <div className="mb-4 flex justify-center">
          <h1 className="font-bold">Borrar Usuario</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black font-bold">Usuario:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black font-bold">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4 flex justify-center">
  <button
    type="submit"
    className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200 mr-2" // Agregando margen derecho
  >
    Eliminar
  </button>
  <button
    type="button"
    className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
    onClick={handleCancel}
  >
    Cancelar
  </button>
</div>
      
        </form>
      </div>
    </div>
  );
}

export default DeleteUser;
