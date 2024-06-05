import { useState } from "react";
import Swal from 'sweetalert2';

function ModifyProperty() {


    const handleEditClick = (property) => {
        setPropertyToEdit(property);
        setIsEditing(true);
        setSelectedLocation(property.id_location);
      };
    
      const handleUpdate = async () => {
        try {
          setLoading(true)
          const token = localStorage.getItem("token");
          const response = await fetch(
            `http://localhost:3000/property/${propertyToEdit.id_property}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(propertyToEdit),
            }
          );
    
          if (response.ok) {
            setIsEditing(false);
            const updatedProperties = properties.map((prop) =>
              prop.id_property === propertyToEdit.id_property
                ? propertyToEdit
                : prop
            );
            setProperties(updatedProperties);
    
            Swal.fire({
              title: "Éxito",
              text: "La propiedad se ha actualizado correctamente",
              icon: "success",
            });
          } else {
            console.error(
              "Error en la respuesta:",
              response.status,
              response.statusText
            );
            const responseData = await response.json();
            console.error("Datos de la respuesta:", responseData);
    
            throw new Error("Error al actualizar la propiedad");
          }
        } catch (error) {
          console.error("Error al actualizar la propiedad:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un error al actualizar la propiedad. Por favor, inténtalo de nuevo más tarde.",
            icon: "error",
          });
        }finally{
          setLoading(false)
        }
      };
    
      const handleUpdateLocation = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `http://localhost:3000/location/${propertyToEdit.id_location}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(propertyToEdit.location), // Usar la ubicación de la propiedad
            }
          );
    
          if (response.ok) {
            setIsEditing(false);
            Swal.fire({
              title: "Éxito",
              text: "La ubicación se ha actualizado correctamente",
              icon: "success",
            });
          } else {
            console.error(
              "Error en la respuesta:",
              response.status,
              response.statusText
            );
            const responseData = await response.json();
            console.error("Datos de la respuesta:", responseData);
    
            throw new Error("Error al actualizar la ubicación");
          }
        } catch (error) {
          console.error("Error al actualizar la ubicación:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un error al actualizar la ubicación. Por favor, inténtalo de nuevo más tarde.",
            icon: "error",
          });
        }
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
      };
    
      const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
      };
    
      const handleFileSelect = (e) => {
        const files = e.target.files;
        const imageUrls = [...propertyToEdit.images];
    
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const imageUrl = URL.createObjectURL(file);
          imageUrls.push(imageUrl);
        }
    
        setPropertyToEdit({
          ...propertyToEdit,
          images: imageUrls,
        });
      };
    
      const handleRemoveImage = (indexToRemove) => {
        const updatedImages = propertyToEdit.images.filter(
          (_, index) => index !== indexToRemove
        );
        setPropertyToEdit({
          ...propertyToEdit,
          images: updatedImages,
        });
      };

//   return (
//     {isEditing && propertyToEdit && (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate(propertyToEdit.id_property);
        }}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold">Datos de la propiedad:</h2>
        <div>
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
              setPropertyToEdit({
                ...propertyToEdit,
                title: e.target.value,
              })
            }
            className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
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
              setPropertyToEdit({
                ...propertyToEdit,
                type: e.target.value,
              })
            }
            className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Seleccionar tipo de alquiler</option>
            <option value="Alquiler temporal">Alquiler temporal</option>
            <option value="Alquiler a largo plazo">
              Alquiler a largo plazo
            </option>
          </select>
        </div>
        {locationsData.length === 0 ? (
          <p>Cargando ubicaciones...</p>
        ) : (
          <select
            id="location"
            name="id_location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Seleccionar ubicación</option>
            {locationsData.map((location) => (
              <option
                key={location.id_location}
                value={location.id_location}
              >
                {`${location.city}, ${location.state}, ${location.country}`}
              </option>
            ))}
          </select>
        )}

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
              setPropertyToEdit({
                ...propertyToEdit,
                rooms: parseInt(e.target.value),
              })
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
              setPropertyToEdit({
                ...propertyToEdit,
                description: e.target.value,
              })
            }
            className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline h-auto resize-none block"
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
              setPropertyToEdit({
                ...propertyToEdit,
                price: parseInt(e.target.value),
              })
            }
            className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="imageUpload"
            className="block text-gray-800 font-bold mb-2"
          >
            Imágenes:
          </label>
          <div
            id="imageDropArea"
            className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:shadow-outline transition-colors ease-in-out duration-300 hover:bg-blue-200"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div
              className="flex flex-wrap gap-4"
              style={{ maxWidth: "300px" }}
            >
              {propertyToEdit.images.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
                    alt={`Image ${index}`}
                    className="max-w-18 h-auto mb-2 rounded-lg"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                  <button
                    className="absolute top-0 right-0 p-1 bg-gray-500 text-white rounded-full"
                    onClick={() => handleRemoveImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="imageUpload">
              Arrastra y suelta imágenes aquí
            </label>
          </div>
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
            <label className="block text-gray-800 font-bold mb-2">
              Imágenes cargadas:
            </label>
            <div className="flex flex-wrap">
              {propertyImages.map((imageUrl, index) => (
                <div key={index} className="relative w-1/4 p-2">
                  <img
                    src={imageUrl}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-auto rounded"
                  />
                  <button
                    className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-end items-center">
          {loading && (
            <ClipLoader
              loading={loading}
              css={override}
              size={25}
              color={"#2A2A26 "}
            />
          )}
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            disabled={loading}
          >
            Guardar Cambios
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setPropertyToEdit(null);
            }}
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
}


export default ModifyProperty;
