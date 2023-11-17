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
    navigate("/user"); // Use navigate from react-router-dom instead of changing window.location.href directly
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
              navigate("/user");
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
      <div className="border-1 border-black p-6 rounded-lg shadow-lg bg-gray-200 w-96">
        <div className="mb-6 flex justify-center">
          <h1 className="font-bold text-xl">Borrar Usuario</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black font-bold mb-2">Usuario:</label>
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
            <label className="block text-black font-bold mb-2">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-8   flex justify-between">
          <button
            type="submit"
            className="w-1/2 bg-gray-800 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Eliminar
          </button>
          <div className="w-4"></div> {/* Espacio entre los botones */}
          <button
            type="button"
            className="w-1/2 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
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
