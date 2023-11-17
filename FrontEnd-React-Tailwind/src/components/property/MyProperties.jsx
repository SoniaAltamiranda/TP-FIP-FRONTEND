import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

function MyProperties({ properties }) {
  const [isEditing, setIsEditing] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState(null);
  const [propertyImages, setPropertyImages] = useState([]);



  const deleteProperty = async (propertyId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/properties/${propertyId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Mostrar una alerta SweetAlert de éxito
        Swal.fire({
          title: "Éxito",
          text: "El inmueble se ha eliminado correctamente",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } else {
        // Mostrar una alerta SweetAlert de error
        Swal.fire({
          title: "Error",
          text: "Error al eliminar el inmueble",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error al eliminar el inmueble:", error);
    }
  };

  const handleEditClick = (property) => {
    setIsEditing(true);
    setPropertyToEdit(property);
    setPropertyImages(property.images);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setPropertyToEdit(null);
    setPropertyImages([]);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setPropertyImages([...propertyImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...propertyImages];
    newImages.splice(index, 1);
    setPropertyImages(newImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const newImages = [...propertyImages];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      newImages.push(imageUrl);
    }

    setPropertyImages(newImages);
  };

  const navigate = useNavigate();

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/properties/${propertyToEdit.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(propertyToEdit),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Cambios realizados con éxito',
          showConfirmButton: false,
          html:
            '<button id="continueButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Continuar</button>',
          didOpen: () => {
            document.getElementById('continueButton').addEventListener('click', () => {
              setIsEditing(false);
              setPropertyToEdit(null);
              navigate('/user');
            });
          },
        });
      } else {
        console.error('Error al modificar la propiedad.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="mt-16">
      <p className="font-bold text-3xl text-center underline mb-4">Mis Propiedades</p>
      {properties.map((property, index) => (

        <div key={property.id} className={`flex p-4 ${index > 0 ? 'border-t border-gray-300 pt-4' : ''}`}>
          <div className="w-1/4">
            <div className="person-image-container">
              <div className="person-image">
                <img
                  src={`${property.images[0]}`}
                  alt="Avatar"
                  className="object-cover w-full h-40"
                />
              </div>
            </div>
          </div>
          <div className="w-3/4 p-4">
            <h4 className="text-xl font-semibold">{property.title}</h4>
            <p className="text-black-600">{property.description}</p>
            <div className="text-center mt-4">
              <button
                className="inline-block bg-blue-500 text-white my-2 py-2 px-4 rounded-full hover-bg-blue-700 mx-auto"
                onClick={() => handleEditClick(property)}
              >
                Modificar
              </button>
              <button
                className="inline-block ml-2 bg-red-500 text-white py-2 px-4 rounded-full hover-bg-blue-700 mx-auto"
                onClick={() => deleteProperty(property.id)}
              >
                Eliminar
              </button>

            </div>
          </div>
        </div>
      ))}


      {isEditing && propertyToEdit && (
        <form onSubmit={handleSaveChanges} encType="multipart/form-data" className="w-3/4 p-2 bg-white rounded-lg shadow-md mt-4">
          <div className="w-3/4 p-2 bg-white rounded-lg shadow-md mt-4">
            <div className="w-3/4 p-2 bg-white rounded-lg shadow-md mt-4">
              <h2>Datos de la propiedad:</h2>
              <div className="mb-2">
                <label
                  htmlFor="title"
                  className="block text-gray-800 font-bold mb-1"
                >
                  Título:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={propertyToEdit.title}
                  onChange={(e) =>
                    setPropertyToEdit({ ...propertyToEdit, title: e.target.value })
                  }
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="type"
                  className="block text-gray-800 font-bold mb-1"
                >
                  Tipo de Alquiler:
                </label>
                <select
                  type="text"
                  id="type"
                  name="type"
                  value={propertyToEdit.type}
                  onChange={(e) =>
                    setPropertyToEdit({ ...propertyToEdit, type: e.target.value })
                  }
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Seleccionar tipo de alquiler</option>
                  <option value="Alquiler temporal">Alquiler temporal</option>
                  <option value="Alquiler a largo plazo">Alquiler a largo plazo</option>
                </select>

              </div>
              <div className="mb-2">
                <label
                  htmlFor="location"
                  className="block text-gray-800 font-bold mb-1"
                >
                  Ubicacion:
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={propertyToEdit.location}
                  onChange={(e) =>
                    setPropertyToEdit({ ...propertyToEdit, location: e.target.value })
                  }
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="rooms"
                  className="block text-gray-800 font-bold mb-1"
                >
                  Ambientes:
                </label>
                <input
                  type="number"
                  id="rooms"
                  name="rooms"
                  value={propertyToEdit.rooms}
                  onChange={(e) =>
                    setPropertyToEdit({ ...propertyToEdit, rooms: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="description"
                  className="block text-gray-800 font-bold mb-1"
                >
                  Descripcion:
                </label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  value={propertyToEdit.description}
                  onChange={(e) =>
                    setPropertyToEdit({ ...propertyToEdit, description: e.target.value })
                  }
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline  h-auto resize-none block"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="price"
                  className="block text-gray-800 font-bold mb-1"
                >
                  Precio - $:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={propertyToEdit.price}
                  onChange={(e) =>
                    setPropertyToEdit({ ...propertyToEdit, price: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="imageUpload" className="block text-gray-800 font-bold mb-2">
                  Imágenes:
                </label>
                <div
                  id="imageDropArea"
                  className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:shadow-outline transition-colors ease-in-out duration-300 hover:bg-blue-200"
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e)}
                ><label htmlFor="imageUpload">
                    Arrastra y suelta imágenes aquí o haz clic para seleccionarlas.
                  </label></div>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileSelect(e)}
                />
              </div>
              {propertyImages.length > 0 && (
                <div className="mb-2">
                  <label className="block text-gray-800 font-bold mb-2">Imágenes cargadas:</label>
                  <div className="flex flex-wrap">
                    {propertyImages.map((imageUrl, index) => (
                      <div key={index} className="relative w-1/4 p-2">
                        <img src={imageUrl} alt={`Imagen ${index + 1}`} className="w-full h-auto rounded" />
                        <button
                          className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700 cursor-pointer"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <img src="../public/images/boton-x.png" alt="Eliminar" className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Enviar Cambios
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

    </div>
  );
}


export default MyProperties;
