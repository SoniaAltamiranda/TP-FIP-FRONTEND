import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import API_URL from "../../configAPIclever/Url_apiClever";

function DeleteUser({ user }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formActive, setFormActive] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Si cancelas, los cambios no se guardarán.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2C3E50",
      cancelButtonColor: "#5D6D7E",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormActive(false); 
        navigate('/user');
      }
    });
  };

  const validateUser = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al validar usuario: ${errorText}`);
      }

      const result = await response.json();
      return result.isValid;
    } catch (error) {
      console.error("Error al validar usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Hubo un error al intentar validar el usuario.",
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "Usuario no autenticado. Por favor, inicia sesión.",
      });
      return;
    }

    try {
      if (!user || !user.id_user) {
        throw new Error("No se proporcionó un usuario válido para eliminar.");
      }

      const isValid = await validateUser();
      if (!isValid) {
        throw new Error("Nombre de usuario o contraseña incorrectos.");
      }

      const userId = user.id_user;
      const deleteResponse = await fetch(`${API_URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (deleteResponse.ok) {
        Swal.fire({
          icon: "success",
          title: "Usuario eliminado con éxito",
          showConfirmButton: true,
        }).then(() => {
          navigate("/");
        });
      } else {
        throw new Error("Error al eliminar usuario.");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Hubo un error al intentar eliminar el usuario.",
      });
    }

    setFormData({ email: "", password: "" });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);


  if (!formActive) {
    return null; 
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-1 border-black p-6 rounded-lg shadow-lg bg-gray-100 w-96">
        <div className="mb-6 flex justify-center">
          <h1 className="font-bold text-gray-700 text-xl">Eliminar mi cuenta</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-8 flex justify-between">
            <button
              type="submit"
              className="w-1/2 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Eliminar
            </button>
            <div className="w-4"></div>
            <button
              type="button"
              onClick={handleCancel}
              className="w-1/2 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
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
