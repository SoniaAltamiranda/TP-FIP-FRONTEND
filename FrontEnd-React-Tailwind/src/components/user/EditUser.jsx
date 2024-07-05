import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import API_URL from "../../configAPIclever/Url_apiClever"; // Asegúrate de importar la URL correcta de tu API

function EditUser({ user }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    password: "",           // Campo para la contraseña actual
    newPassword: "",        // Campo para la nueva contraseña
    confirmNewPassword: "", // Campo para confirmar la nueva contraseña
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  }

  function handleCancel() {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Si cancelas, se perderán los cambios.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/user');
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validación de la nueva contraseña
    if (userData.newPassword !== userData.confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas nuevas no coinciden.',
      });
      return;
    }

    const dataToSend = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      newPassword: userData.newPassword,
    };

    fetch(`${API_URL}/user/${user.id_user}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar usuario');
        }
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Los cambios se guardaron correctamente.',
        });
        navigate('/user');
      })
      .catch((error) => {
        console.error('Error al actualizar usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al actualizar el usuario.',
        });
      });
  }
  
  
  
  return (
    <div className="flex flex-col items-center bg-gray-200 justify-center">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-gray-300  bg-gray-200 p-4 rounded-lg shadow-lg w-80 mb-4"
      >
        <h1 className="text-xl font-semibold text-center mb-4">Editar Usuario</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
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
            value={userData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Contraseña Actual:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium">
            Nueva Contraseña:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={userData.newPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmNewPassword" className="block text-sm font-medium">
            Confirmar Nueva Contraseña:
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={userData.confirmNewPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
