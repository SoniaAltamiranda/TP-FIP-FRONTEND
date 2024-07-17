import React, { useState } from "react";
import Swal from "sweetalert2";
import API_URL from "../../configAPIclever/Url_apiClever";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

function ModifyProperty({ property, locationsData, setIsEditing }) {
  const override = css`
    display: block;
    margin: 0 auto;
  `;
  const [propertyToEdit, setPropertyToEdit] = useState(property);
  const [selectedLocation, setSelectedLocation] = useState(property.id_location);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const uploadedImages = await Promise.all(
        newImages.map(async (imageFile, index) => {
          const formData = new FormData();
          formData.append("image", imageFile);
          formData.append("type", "image");
          formData.append("title", `Image ${index + 1}`);
          formData.append("description", `Description for image ${index + 1}`);
          console.log(formData.image);
          const response = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
              Authorization: `Client-ID 83323e63212094a`,
            },
            body: formData,
            redirect: "follow",
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
          confirmButtonColor: "#2C3E50",
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
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "id_location") {
      const locationId = parseInt(value);
      setSelectedLocation(locationId);
    } else {
      setPropertyToEdit((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    const imageFiles = Array.from(files);
    setNewImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = propertyToEdit.images.filter((_, index) => index !== indexToRemove);
    setPropertyToEdit((prevData) => ({ ...prevData, images: updatedImages }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md md:w-1/2 lg:w-1/3 xl:w-1/2 mt-8">
        <form onSubmit={handleUpdate} className="space-y-1">
          <h2 className="text-1x1 font-bold">Datos de la propiedad:</h2>
          <div>
            <label htmlFor="title" className="block text-gray-800 font-bold mb-1">
              Título:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={propertyToEdit.title}
              onChange={handleChange}
              className="border border-gray-400 p-1 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-800 font-bold mb-1">
              Descripción:
            </label>
            <textarea
              id="description"
              name="description"
              value={propertyToEdit.description}
              onChange={handleChange}
              className="border border-gray-400 p-1 rounded w-full h-auto resize-none"
            />
          </div>
          <div>
            <label htmlFor="rooms" className="block text-gray-800 font-bold mb-1">
              Ambientes:
            </label>
            <input
              type="number"
              id="rooms"
              name="rooms"
              value={propertyToEdit.rooms}
              onChange={handleChange}
              className="border border-gray-400 p-1 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-gray-800 font-bold mb-1">
              Tipo de Alquiler:
            </label>
            <select
              id="type"
              name="type"
              value={propertyToEdit.type}
              onChange={handleChange}
              className="border border-gray-400 p-1 rounded w-full"
            >
              <option value="Alquiler temporal">Alquiler temporal</option>
              <option value="Alquiler permanente">Alquiler permanente</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-800 font-bold mb-1">
              Precio:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={propertyToEdit.price}
              onChange={handleChange}
              className="border border-gray-400 p-1 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-800 font-bold mb-1">
              Ubicación:
            </label>
            <select
              id="location"
              name="id_location"
              value={selectedLocation}
              onChange={handleChange}
              className="border border-gray-400 p-1 rounded w-full"
            >
              {locationsData.map((location) => (
                <option key={location.id_location} value={location.id_location}>
                  {location.city}, {location.state}, {location.country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="images" className="block text-gray-800 font-bold mb-1">
              Imágenes:
            </label>
            <div
              id="imageDropArea"
              className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:shadow-outline transition-colors ease-in-out duration-300 hover:bg-blue-200"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-wrap gap-4" style={{ maxWidth: "300px" }}>
                {propertyToEdit.images.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imageUrl instanceof File ? URL.createObjectURL(imageUrl) : imageUrl}
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
                {newImages.map((imageFile, index) => (
                  <div key={`new-${index}`} className="relative">
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt={`New Image ${index}`}
                      className="max-w-18 h-auto mb-1 rounded-lg"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  </div>
                ))}
              </div>
              <label htmlFor="imageUpload">Arrastra y suelta imágenes aquí </label>
            </div>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded"
              disabled={loading}
            >
              {loading ? <ClipLoader css={override} size={20} color={"#ffffff"} loading={loading} /> : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifyProperty;