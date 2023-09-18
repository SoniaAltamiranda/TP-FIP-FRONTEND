import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password } = formData;
    const BASE_URL = "http://localhost:3030/users/";

    try {
      const response = await fetch(`${BASE_URL}?name=${name}&password=${password}`);
      if (response.ok) {
        const userData = await response.json();
        if (userData.length > 0) {
          navigate("/user");
        } else {
          alert("Credenciales incorrectas. Por favor, inténtalo de nuevo o regístrate.");
        }
      } else {
        alert("Error de autenticación. Por favor, inténtalo de nuevo más tarde.");
      }
    } catch (error) {
      console.error("Error al realizar la autenticación:", error);
      alert("Error de autenticación. Por favor, inténtalo de nuevo más tarde.");
    }

    setFormData({ name: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-2 border-black p-4">
        <div className="mb-4 flex justify-center">
          <h1 className="font-bold ">Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Usuario:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        <p>
          ¿No estás registrado?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;