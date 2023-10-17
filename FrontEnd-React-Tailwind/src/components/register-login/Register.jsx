// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:3030/users/";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registro exitoso");

        setFormData({
          username: "",
          email: "",
          password: "",
          phone: "",
        });

        // Redirigir al usuario después del registro exitoso
        navigate("/login");
      } else {
        setMessage("Error en el registro");
      }
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
      setMessage("Error en la solicitud POST");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-400 min-h-screen flex items-center justify-center">
       <div className="text-center mb-8">
        <h1 className="text-6xl text-gray-700 font-extrabold mb-2">ALQUILAFÁCIL.COM</h1>
        <hr className="w-1/4 border-t-2 border-gray-700 mx-auto mb-4" />
        <p className="text-lg text-gray-700">La forma más conveniente de alquilar lo que necesitas.</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="border-2 border-gray-300 p-4 rounded-lg shadow-lg w-80"
      >
        <h1 className="text-xl font-semibold text-center mb-4">Registro</h1>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Nombre de Usuario:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
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
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium">
            Teléfono:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default Register;
