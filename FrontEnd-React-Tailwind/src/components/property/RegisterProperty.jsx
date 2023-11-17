import { useState } from "react";
import Swal from "sweetalert2";
import { useContext } from "react";
import { usersContext } from "../../context/usersContext";

const BASE_URL = "http://localhost:3000/properties/";

const RegisterProperty = () => {

  const { currentUser } = useContext(usersContext);

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

  const id_user = currentUser ? currentUser.id : null;
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
      url_iframe: "http......",//provisoriamente para poder mostrar

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

  // Función para prevenir el comportamiento predeterminado de arrastrar y soltar
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Función para manejar la caída de archivos
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const imageUrls = formData.images.slice(); // Copia la lista de imágenes actual

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file); // Genera una URL temporal para la imagen
      imageUrls.push(imageUrl);
    }

    setFormData({
      ...formData,
      images: imageUrls,
    });
  };

  // Función para seleccionar archivos 
  const handleFileSelect = (e) => {
    const files = e.target.files;
    const imageUrls = formData.images.slice(); // Copia la lista de imágenes actual

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file); // Genera una URL temporal para la imagen
      imageUrls.push(imageUrl);
    }

    setFormData({
      ...formData,
      images: imageUrls,
    });
  };

  const handleRemoveImage = (index) => {
    // Copia el array de imágenes actual y elimina la imagen en el índice proporcionado
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
  
    // Actualiza el estado con las imágenes actualizadas
    setFormData({ ...formData, images: updatedImages });
  };


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-3/4 p-2 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <label htmlFor="type" className="block text-gray-800 font-bold mb-1">
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
              className="block text-gray-800 font-bold mb-1"
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
          {formData.images.length > 0 && (
            <div className="mb-2">
            <label className="block text-gray-800 font-bold mb-2">Imágenes cargadas:</label>
            <div className="flex flex-wrap">
              {formData.images.map((imageUrl, index) => (
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

