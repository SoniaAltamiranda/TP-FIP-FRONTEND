import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import API_URL from "../../configAPIclever/Url_apiClever";

function DeleteUser({ user }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    username: user.username,
  });

  function handleCancel() {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Si cancelas, se cancelará la eliminación de la cuenta.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const deleteResponse = await fetch(`${API_URL}/user/${user.id_user}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (deleteResponse.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario eliminado con éxito',
          text: 'Tu cuenta ha sido eliminada.',
        }).then(() => {
        
          navigate('/');
        });
      } else {
        throw new Error('Error al eliminar usuario.');
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar el usuario.',
      });
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-1 border-black p-6 rounded-lg shadow-lg bg-gray-100 w-96">
        <div className="mb-6 flex justify-center">
          <h1 className="font-bold text-gray-700 text-xl">
            Eliminar mi cuenta
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Usuario:
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              readOnly 
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
