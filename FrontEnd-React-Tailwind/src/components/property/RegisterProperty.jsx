import React, { useState } from "react";
import Swal from "sweetalert2";
// import { UsersContext } from "../../context/usersContext";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const BASE_URL = "http://localhost:3000/property/";

const RegisterProperty = () => {

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.sub : null;
  console.log(userId);
  console.log(token);

  // const { currentUser } = useContext(UsersContext);

  const initialFormData = {
    title: "",
    type: "",
    location: "",
    rooms: "",
    description: "",
    address: "",
    price: "",
    rate: 0,
    //images: [],
    url_iframe: "",
    id_user: userId,
    id_booking: 1,
    id_location: 2,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!userId) {
      alert("Debes iniciar sesión para publicar una propiedad.");
      return;
    }

    const jsonData = {
      title: formData.title,
      type: formData.type,
      location: formData.location,
      rooms: parseInt(formData.rooms),
      description: formData.description,
      price: parseInt(formData.price),
      rate: 0, //provisoriamente
      images: ["imagen1", "imagen2", "imagen3"],
      id_user: parseInt(userId),
      url_iframe:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51639.59303061964!2d-59.09519054999999!3d-36.0087031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959635293797eb09%3A0x37727efde49396ee!2sLas%20Flores%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1697058472501!5m2!1ses-419!2sar",
      id_booking: 2,
      id_location: 2,
    };
    console.log(jsonData);
    try {

      
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify(jsonData),
      })

      console.log(response);
      if (!response.ok) {
        throw new Error(`Error en el registro de la propiedad`);
      }
      Swal.fire({
        icon: "success",
        title: "Su propiedad fue publicada exitosamente",
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "Continuar",
      })
      setFormData(initialFormData);
    }
    catch (error) {
      console.error("Error al enviar datos:", error);

    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const imageUrls = formData.images.slice();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      imageUrls.push(imageUrl);
    }

    setFormData({
      ...formData,
      images: imageUrls,
    });
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    const imageUrls = formData.images.slice();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      imageUrls.push(imageUrl);
    }

    setFormData({
      ...formData,
      images: imageUrls,
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);

    setFormData({ ...formData, images: updatedImages });
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
              htmlFor="type"
              className="block text-gray-800 text-sm font-bold mb-1"
            >
              Tipo de Alquiler:
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
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
              value={formData.address}
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
              className="block text-gray-800 text-sm font-bold mb-1"
            >
              Ubicación:
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
              className="block text-gray-800 text-sm font-bold mb-1"
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
              className="block text-gray-800 text-sm font-bold mb-1"
            >
              Descripción:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
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
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <label
            htmlFor="imageUpload"
            className="block  text-sm text-gray-800 font-bold mb-2"
          >
            Imágenes:
          </label>
          <div
            id="imageDropArea"
            className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:shadow-outline transition-colors ease-in-out duration-300 hover:bg-blue-200"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e)}
          >
            <label htmlFor="imageUpload text-sm" />
          </div>
          {formData.images}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>

        <div className="mb-4 text-center">
          ¿No estás registrado?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterProperty;
