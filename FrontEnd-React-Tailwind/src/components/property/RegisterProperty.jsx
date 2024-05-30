import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function RegisterProperty() {
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    rooms: 0,
    price: 0,
    images: [],
    rate: 0,
    type: "",
    address: "",
    url_iframe: "",
    id_location: 1,
    id_booking: 0,
  });

  useEffect(() => {
    const getTokenAndSetUserId = async () => {
      try {
        const token = localStorage.getItem("token");
        const payload = jwtDecode(token);
        setPropertyData({ ...propertyData, id_user: payload.sub });
      } catch (error) {
        console.error("Error al obtener el id_user del token:", error);
      }
    };
    getTokenAndSetUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const uploadedImageUrls = await uploadImagesToImgur(propertyData.images); // Upload images and get URLs
        const updatedPropertyData = { ...propertyData, images: uploadedImageUrls }; // Update propertyData with URLs
        const token = localStorage.getItem("token");

        const parsedRooms = parseInt(propertyData.rooms);
        const parsedPrice = parseInt(propertyData.price);
        const dataToSend = {
            ...updatedPropertyData,
            rooms: parsedRooms,
            price: parsedPrice,
        };

        const response = await fetch("http://localhost:3000/property", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dataToSend),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Propiedad registrada:", data);

            Swal.fire({
                title: "¡Propiedad Registrada!",
                text: "Tu propiedad ha sido registrada exitosamente.",
                icon: "success",
            });
        } else {
            throw new Error(data.message || "Error al registrar la propiedad");
        }
    } catch (error) {
        console.error("Error al registrar la propiedad:", error);
        Swal.fire({
            title: "Error",
            text: "Hubo un error al registrar la propiedad. Por favor, inténtalo de nuevo más tarde.",
            icon: "error",
        });
    }
};

  async function uploadImagesToImgur(images) {
    const imageUrls = [];
    for (const image of images) {
        const formData = new FormData();
        formData.append("image", image); // Append the actual image file
        
        try {
            const response = await fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    Authorization: 'Client-ID 83323e63212094a',
                },
                body: formData
            });
            const data = await response.json(); // Parse JSON response
            const imageUrl = data.data.link; // Access the 'link' property in the 'data' object
            imageUrls.push(imageUrl);
        } catch (error) {
            console.error("Error uploading image to Imgur:", error);
        }
    }

    return imageUrls;
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const updatedImages = [...propertyData.images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      updatedImages.push(file);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    const updatedImages = [...propertyData.images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      updatedImages.push(file);
    }

    setPropertyData({
      ...propertyData,
      images: updatedImages,
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = propertyData.images.filter(
      (_, index) => index !== indexToRemove
    );
    setPropertyData({
      ...propertyData,
      images: updatedImages,
    });
  };

  return (
    <div className="flex justify-center items-center h-auto">
      <div className="max-w-md p-4 bg-white rounded-lg shadow-md mt-20">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="">
            <label
              htmlFor="title"
              className="block text-gray-800 text-sm font-bold mb-1"
            >
              Título:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={propertyData.title}
              onChange={handleChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
              required
              pattern="[A-Za-záéíóúÁÉÍÓÚñÑ\s]+"
              title="Solo se permiten letras y espacios en blanco"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="type"
              className="block text-gray-800 text-sm font-bold mb-1"
            >
              Tipo de Alquiler:
            </label>
            <select
              id="type"
              name="type"
              value={propertyData.type}
              onChange={handleChange}
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
          <div className="">
            <label
              htmlFor="title"
              className="block text-gray-800 text-sm font-bold mb-1"
            >
              Dirección:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={propertyData.address}
              onChange={handleChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
              required
              pattern="[A-Za-záéíóúÁÉÍÓÚñÑ\s]+"
              title="Solo se permiten letras y espacios en blanco"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-gray-800 text-sm font-bold mb-1"
            >
              Ubicación:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={propertyData.location}
              onChange={handleChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-gray-800 text-sm font-bold mb-1"
            >
              Ambientes:
            </label>
            <input
              type="number"
              id="rooms"
              name="rooms"
              value={propertyData.rooms}
              onChange={handleChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-gray-800 text-sm font-bold mb-1"
            >
              Descripción:
            </label>
            <textarea
              id="description"
              name="description"
              value={propertyData.description}
              onChange={handleChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline h-auto resize-none block"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-gray-800 text-sm font-bold mb-1"
            >
              Precio - $:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={propertyData.price}
              onChange={handleChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label
              htmlFor="imageUpload"
              className="block text-sm text-gray-800 font-bold mb-2"
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
                {propertyData.images.map((imageUrl, index) => (
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
              name="imageUpload"
              multiple
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
          </div>

          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterProperty;