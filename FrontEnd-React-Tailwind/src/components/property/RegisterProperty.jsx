import { useState } from "react";
import Swal from "sweetalert2";

const BASE_URL = "http://localhost:3000/properties/";

const RegisterProperty = () => {
  const initialFormData = {
    title: "",
    type: "",
    location: "",
    rooms: "",
    description: "",
    price: "",
    images: [],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleImageChange = (e) => {
    const { value } = e.target;
    const imageUrls = value.split("\n").filter((url) => url.trim() !== "");
    setFormData({
      ...formData,
      images: imageUrls,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = {
      title: formData.title,
      type: formData.type,
      location: formData.location,
      rooms: parseInt(formData.rooms),
      description: formData.description,
      price: parseInt(formData.price),
      images: formData.images,
    };

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error en la solicitud`);
        }
      })
      .then((data) => {
        console.log("Datos enviados con éxito:", data);

        Swal.fire({
          icon: "success",
          title: "Su propiedad fue publicada exitosamente",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: "Continuar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "http://localhost:5173/user";
          }
        });
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("Error al enviar datos:", error);
        if (error.response) {
          error.response.json().then((errorData) => {
            console.error("Detalles del error:", errorData);
          });
        } else {
          console.error("Error de red o respuesta vacía del servidor");
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-10">
      <div className="w-3/4 p-2 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
        <div className="mb-2">
  <label htmlFor="title" className="block text-gray-800 font-bold mb-1">
    Título:
  </label>
  <input
    type="text"
    id="title"
    name="title"
    value={formData.title}
    onChange={handleInputChange}
    className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
    required
    pattern="[A-Za-záéíóúÁÉÍÓÚñÑ\s]+"
    title="Solo se permiten letras y espacios en blanco"
  />
</div>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-gray-800 font-bold mb-1"
            >
              Tipo de Alquiler:
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-gray-800 font-bold mb-1"
            >
              Ubicacion:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-gray-800 font-bold mb-1"
            >
              Ambientes:
            </label>
            <input
              type="number"
              id="rooms"
              name="rooms"
              value={formData.rooms}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-gray-800 font-bold mb-1"
            >
              Descripcion:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-gray-800 font-bold mb-1"
            >
              Precio:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="imageUrls"
              className="block text-gray-800 font-bold mb-2"
            >
              URLs de las Imágenes (una por línea):
            </label>
            <textarea
              id="imageUrls"
              name="imageUrls"
              value={formData.images.join("\n")}
              onChange={handleImageChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
              rows="3"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterProperty;
