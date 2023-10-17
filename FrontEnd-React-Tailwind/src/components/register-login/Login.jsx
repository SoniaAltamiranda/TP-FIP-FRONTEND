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
      const response = await fetch(
        `${BASE_URL}?name=${name}&password=${password}`
      );
      if (response.ok) {
        const userData = await response.json();
        if (userData.length > 0) {
          navigate("/user");
        } else {
          alert(
            "Credenciales incorrectas. Por favor, inténtalo de nuevo o regístrate."
          );
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
    <div className="bg-gradient-to-b from-gray-100 to-gray-400 min-h-screen flex items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-6xl text-gray-700 font-extrabold mb-2">ALQUILAFÁCIL.COM</h1>
        <hr className="w-1/4 border-t-2 border-gray-700 mx-auto mb-4" />
        <p className="text-lg text-gray-700">La forma más conveniente de alquilar lo que necesitas.</p>
      </div>
      <div className="border-2 border-gray-300 p-4 rounded-lg shadow-lg w-80">
        <h1 className="text-xl font-semibold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Usuario:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4 flex justify-center">
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        <div className="mb-4 text-center">
          ¿No estás registrado?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
