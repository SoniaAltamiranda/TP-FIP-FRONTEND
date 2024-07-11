import React, { useState } from "react";
import Swal from "sweetalert2";
import API_URL from "../../configAPIclever/Url_apiClever";

function ModifyProperty({ property, locationsData, setIsEditing }) {
  const [propertyToEdit, setPropertyToEdit] = useState(property);
  const [selectedLocation, setSelectedLocation] = useState(property.id_location);
  const [newImages, setNewImages] = useState([]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const uploadedImages = await Promise.all(
        newImages.map(async (imageFile, index) => {
          const formData = new FormData();
          formData.append("image", imageFile);
          formData.append("type", "image");
          formData.append("title", `Image ${index + 1}`);
          formData.append("description", `Description for image ${index + 1}`);

          const response = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
              Authorization: `Client-ID 83323e63212094a`,
            },
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Error al subir la imagen a Imgur: ${response.statusText}`);
          }

          const result = await response.json();
          if (result.success) {
            return result.data.link;
          } else {
            throw new Error("Error al obtener el enlace de la imagen");
          }
        })
      );


      const updatedProperty = {
        ...propertyToEdit,
        id_location: Number(selectedLocation),
        rooms: Number(propertyToEdit.rooms),
        price: Number(propertyToEdit.price),
        images: [...propertyToEdit.images, ...uploadedImages],
      };

      const response = await fetch(`${API_URL}/property/${propertyToEdit.id_property}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProperty),
      });

      if (response.ok) {
        setIsEditing(false);
        Swal.fire({
          title: "Éxito",
          text: "La propiedad se ha actualizado correctamente",
          icon: "success",
        });
      } else {
        const responseData = await response.json();
        console.error("Error en la respuesta:", response.status, response.statusText);
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
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]);

    const imagePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          resolve(e.target.result);
        };

        reader.onerror = (e) => {
          reject(new Error("Error al leer la imagen."));
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then((imagesDataUrls) => {
        setPropertyToEdit((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...imagesDataUrls],
        }));
      })
      .catch((error) => {
        console.error("Error al cargar las imágenes:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al cargar las imágenes. Por favor, inténtalo de nuevo más tarde.",
          icon: "error",
        });
      });
  };

  const handleRemoveImage = (index) => {
    setPropertyToEdit((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages.splice(index, 1);
      return {
        ...prevData,
        images: updatedImages,
      };
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
        <form onSubmit={handleUpdate} className="space-y-4">
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
                setPropertyToEdit({ ...propertyToEdit, title: e.target.value })
              }
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-800 font-bold mb-1"
            >
              Descripción:
            </label>
            <input
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
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div>
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
                setPropertyToEdit({ ...propertyToEdit, rooms: e.target.value })
              }
              className="border border-gray-400 p-2 rounded w-full"
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
              id="type"
              name="type"
              value={propertyToEdit.type}
              onChange={(e) =>
                setPropertyToEdit({
                  ...propertyToEdit,
                  type: e.target.value,
                })
              }
              className="border border-gray-400 p-2 rounded w-full"
            >
              <option value="Alquiler temporal">Alquiler temporal</option>
              <option value="Alquiler permanente">Alquiler permanente</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-gray-800 font-bold mb-1"
            >
              Precio:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={propertyToEdit.price}
              onChange={(e) =>
                setPropertyToEdit({ ...propertyToEdit, price: e.target.value })
              }
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-gray-800 font-bold mb-1"
            >
              Ubicación:
            </label>
            <select
              id="location"
              name="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border border-gray-400 p-2 rounded w-full"
            >
              {locationsData.map((location) => (
                <option key={location.id_location} value={location.id_location}>
                  {location.city}, {location.state}, {location.country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="images"
              className="block text-gray-800 font-bold mb-1"
            >
              Imágenes:
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {propertyToEdit.images.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={
                      imageUrl instanceof File
                        ? URL.createObjectURL(imageUrl)
                        : imageUrl
                    }
                    alt={`Image ${index}`}
                    className="max-w-18 h-auto mb-2 rounded-lg"
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                  <button
                    className="absolute top-0 right-0 p-1 bg-gray-500 text-white rounded-full"
                    onClick={() => handleRemoveImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
              {newImages.map((imageFile, index) => (
                <div key={`new-${index}`} className="relative">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt={`New Image ${index}`}
                    className="max-w-18 h-auto mb-2 rounded-lg"
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                </div>
              ))}
            </div>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifyProperty;
