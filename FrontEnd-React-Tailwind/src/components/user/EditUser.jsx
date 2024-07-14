import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import API_URL from "../../configAPIclever/Url_apiClever";

function EditUser({ user }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });
  const [formActive, setFormActive] = useState(true); // Estado para controlar si el formulario está activo

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`${API_URL}/user/${user.id_user}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          throw new Error('Error al obtener los datos del usuario.');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al obtener los datos del usuario.',
        });
      }
    }

    fetchUserData();
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleCancel() {
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
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const updateResponse = await fetch(`${API_URL}/user/${user.id_user}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (updateResponse.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado con éxito',
          text: 'Tu cuenta ha sido actualizada.',
        }).then(() => {
          navigate('/');
        });
      } else {
        throw new Error('Error al actualizar usuario.');
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar el usuario.',
      });
    }
  }

  if (!formActive) {
    return null; 
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-1 border-black p-6 rounded-lg shadow-lg bg-gray-100 w-96">
        <div className="mb-6 flex justify-center">
          <h1 className="font-bold text-gray-700 text-xl">
            Editar mi cuenta
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Apellido:
            </label>
            <input
              type="text"
              name="lastname"
              value={userData.lastname}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Usuario:
            </label>
            <input
              type="text"
              name="username"
              value={userData.username}
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
              Guardar
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

export default EditUser;
