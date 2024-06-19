
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function EditUser({ user }) {
  const navigate = useNavigate();
  const [isCancelled, setIsCancelled] = useState(false);
  const [userData, setUserData] = useState({
   
    name: user.name,
   
    email: user.email,
  
    password: user.password,
    
  
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
       
        setIsCancelled(true);
        navigate('/user');
      }
      
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`https://app-911c1751-2ae2-4279-bd11-cb475df87978.cleverapps.io/user/${user.id_user}`, {
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
  }
  return (
    <div className="flex flex-col items-center bg-gray-200 justify-center">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-gray-300  bg-gray-200 p-4 rounded-lg shadow-lg w-80 mb-4"
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
        
        <div className="flex space-x-4">
        
        <button
          type="submit"
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
export default EditUser;