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
<<<<<<< HEAD
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
=======
   Swal.fire({
      title: "¿Estás seguro?",
      text: "Si cancelas, se perderan los cambios.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34495E",
      cancelButtonColor: "#566573",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }) 
    location.reload()
>>>>>>> a2c0e3575e51c272bdb4d722c64248ae005862a9
  }

  function handleSubmit(e) {
    e.preventDefault();
<<<<<<< HEAD
  
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
=======
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
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          confirmButtonColor: '#2E4053',
          text: 'Los cambios se guardaron correctamente.',
        });
        navigate('/user')
      })
      .catch((error) => {
        console.error('Error al actualizar usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al actualizar el usuario.',
        });
      });
>>>>>>> a2c0e3575e51c272bdb4d722c64248ae005862a9
  }


  useEffect(() => {
    if (isEditConfirmed) {
      setIsEditConfirmed(false);
      navigate(`/user/${user.id}`);
    }
  }, [isEditConfirmed, navigate, user]);

  return (
    <div className="flex flex-col items-center bg-gray-200 border-2 border-gray-300  justify-center max-w-md w-full mx-auto rounded-lg shadow-lg mt-28">
      <h1 className="text-xl font-semibold text-center mt-4">Editar mis datos:</h1>
      <form
        onSubmit={handleSubmit}
        className=" bg-gray-200 p-4  w-80 "
      >
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
      </form>
      <div className="flex space-x-4 mb-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-gray-700 text-white p-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Modificar
        </button>
        <button
          type=""
          onClick={handleCancel}
          className="w-full bg-gray-700 text-white p-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default EditUser
