import { useState } from "react";
import Swal from "sweetalert2";
import { useContext } from "react";
import { usersContext } from "../../context/usersContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000/properties/";

const RegisterProperty = ({user}) => {
  const navigate = useNavigate();

  const { currentUser } = useContext(usersContext);
  console.log(user);

  const initialFormData = {
    title: "",
    type: "",
    location: "",
    rooms: "",
    description: "",
    price: "",
    rate: 0,
    images: [],
    id_propietor: "",
    url_iframe: "",
  };

  const [formData, setFormData] = useState(initialFormData);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const id_user = user ? user.id : null;
  console.log("id_user:", id_user);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id_user) {
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
      rate: 0,//provisoriamente
      images: formData.images,
      id_propietor: id_user,
      url_iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51639.59303061964!2d-59.09519054999999!3d-36.0087031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959635293797eb09%3A0x37727efde49396ee!2sLas%20Flores%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1697058472501!5m2!1ses-419!2sar",

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
          confirmButtonColor: "#34495E",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
           
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
            <label htmlFor="title" className="block text-gray-800 text-sm font-bold mb-1">
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
            <label htmlFor="type" className="block text-gray-800 text-sm font-bold mb-1">
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
              <option value="Alquiler a largo plazo">Alquiler a largo plazo</option>
            </select>
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

          <div className="mb-2">
            <label htmlFor="imageUpload" className="block  text-sm text-gray-800 font-bold mb-2">
              Imágenes:
            </label>
            <div
              id="imageDropArea"
              className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:shadow-outline transition-colors ease-in-out duration-300 hover:bg-blue-200"
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e)}
            >
              <label htmlFor="imageUpload" className="text-sm">
                Arrastra y suelta imágenes aquí o haz clic para seleccionarlas.
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileSelect(e)}
              />
            </div>
          </div>
          {formData.images.length > 0 && (
            <div className="mb-2">
              <label className="block text-gray-800 font-bold text-sm mb-2">Imágenes cargadas:</label>
              <div className="flex flex-wrap">
                {formData.images.map((imageUrl, index) => (
                  <div key={index} className="relative w-1/4 p-2">
                    <img src={imageUrl} alt={`Imagen ${index + 1}`} className="w-full h-auto rounded" />
                    <button
                      className="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <img src="../public/images/boton-x.png" alt="Eliminar" className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
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

