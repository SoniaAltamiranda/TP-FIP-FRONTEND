/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function EditUser({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCancelled, setIsCancelled] = useState(false);
  const [isEditConfirmed, setIsEditConfirmed] = useState(false);

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    phone: user.phone,
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
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Si cancelas, perderás los cambios.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsCancelled(true);
        setIsEditConfirmed(true);
        navigate(-1, { state: location.state });
      }
    });
  }


  function handleSubmit(e) {
    e.preventDefault();
  
    if (isCancelled) {
      return;
    }
  
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de modificar tus datos?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3030/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error al actualizar usuario');
            }
          })
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Los cambios se guardaron correctamente.',
            });
            setIsEditConfirmed(true); // Indica que la edición fue confirmada con éxito
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
    });
  }


  useEffect(() => {
    if (isEditConfirmed) {
      setIsEditConfirmed(false);
      navigate(`/user/${user.id}`);
    }
  }, [isEditConfirmed, navigate, user]);

  return (
    <div className="flex items-center justify-center h-screen">
      <form

        className="border-2 border-gray-300  bg-gray-200 p-4 rounded-lg shadow-lg w-80"
      >
        <h1 className="text-xl font-semibold text-center mb-4">Registro</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Nombre de Usuario:
          </label>
          <input
            type="text"
            id="username"
            name="username"
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
            Contraseña:
          </label>
          <input
            type=""
            id="password"
            name="password"
            value={userData.password}
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
            value={userData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type=""
            onClick={handleSubmit}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Modificar
          </button>
          <button
            type=""
            onClick={handleCancel}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUser
