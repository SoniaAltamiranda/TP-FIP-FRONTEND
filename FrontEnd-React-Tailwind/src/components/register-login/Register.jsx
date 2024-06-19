import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return; 
    } else if (formData.password.length < 8 || formData.password.length > 10) {
      setMessage("La contraseña debe tener entre 8 y 10 caracteres.");
      return; 
    }
  
    try {
      const response = await fetch('https://app-911c1751-2ae2-4279-bd11-cb475df87978.cleverapps.io/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }
  
      const data = await response.json();
      console.log('Usuario registrado:', data);
      
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Usted se ha registrado correctamente.',
        confirmButtonText: 'Ir al inicio de sesión',
        confirmButtonColor: '#2E4053' 
      }).then(() => {
        navigate('/login');
      });
      
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      setMessage(error.message); 
    }
  };
  
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-400 min-h-screen flex flex-col md:flex-row items-center justify-center">
  <div className=" text-center md:text-left mb-2 mx-2 md:flex md:items-center">
    <div>
      <h1 className="mt-16 text-4xl md:text-6xl text-gray-700 font-extrabold mb-2">ALQUILAFÁCIL.COM</h1>
      <hr className="w-1/4 md:w-1/6 border-t-2 border-gray-700 mx-auto mb-4" />
      <p className="text-base text-center md:text-lg text-gray-700">
        La forma más conveniente de alquilar lo que necesitas.
      </p>
    </div>
  </div>
  <form
    onSubmit={handleSubmit}
    className="border-2 border-gray-300 p-10 rounded-lg shadow-lg max-w-sm w-full mx-10 md:mx-0 md:max-w-s md:self-center mt-10 md:mt-0 md:w-1/2"
  >
    <h1 className="text-xl font-semibold text-center mb-4">Registro</h1>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre:
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
          <label htmlFor="lastname" className="block text-sm font-medium">
            Apellido:
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            required
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
            required
          />
        </div>
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
          {formData.password.length > 0 && ( 
            <p className="text-sm text-gray-500">
              La contraseña debe tener entre 8 y 10 caracteres.
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirmar Contraseña:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            required
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
