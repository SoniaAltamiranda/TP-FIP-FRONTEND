import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function MyProperties({ user }) {
  const [properties, setProperties] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState(null);
  const [propertyImages, setPropertyImages] = useState([]);

  const token = localStorage.getItem("token");
  const payload = jwtDecode(token);

  useEffect(() => {
    async function fetchProperties() {
      try {
        if (!token) {
          throw new Error("No se encontró el token de autenticación.");
        }

        if (!user || !user.id_user) {
          throw new Error("No se proporcionó un usuario válido.");
        }

        const userId = user.id_user;

        const response = await fetch(
          `http://localhost:3000/property?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al cargar las propiedades.");
        }

        const propertiesData = await response.json();
        setProperties(propertiesData);
      } catch (error) {
        console.error("Error al cargar las propiedades:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al cargar las propiedades. Por favor, inténtalo de nuevo más tarde.",
          icon: "error",
        });
      }
    }
    fetchProperties();
  }, [user]);

  //--------------DELETE---------------------------

  const handleDelete = async (id_property) => {
   
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`http://localhost:3000/property/${payload.sub}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.ok) {
            
            setProperties(properties.filter((property) => property.id !== id_property));
            Swal.fire({
              title: "¡Propiedad Eliminada!",
              text: "La propiedad ha sido eliminada exitosamente.",
              icon: "success",
            });
          } else {
         
            throw new Error("Error al eliminar la propiedad");
          }
        } catch (error) {
          console.error("Error al eliminar la propiedad:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un error al eliminar la propiedad. Por favor, inténtalo de nuevo más tarde.",
            icon: "error",
          });
        }
      }
    });
  };
  
  
  //--------------EDIT---------------------------

  const handleEditClick = (property) => {
    setIsEditing(true);
    setPropertyToEdit(property);
  };

  const handleUpdate = async (updatedProperty) => {
    try {
      console.log(updatedProperty);
      const response = await fetch(
        `http://localhost:3000/property/${updatedProperty.id_property}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatedProperty),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Éxito",
          text: "La propiedad se ha actualizado correctamente",
          icon: "success",
        });

        const updatedProperties = properties.map((property) =>
          property.id === updatedProperty.id ? updatedProperty : property
        );
        setProperties(updatedProperties);

        setIsEditing(false);
        setPropertyToEdit(null);
      } else {
        throw new Error("Error al actualizar la propiedad");
      }
    } catch (error) {
      console.error("Error al actualizar la propiedad:", error);
      Swal.fire({
        title: "Error",
        text: "Error al actualizar la propiedad",
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

  return (
    <div className="mt-20 bg-opacity-50 rounded-lg">
      <p className="font-bold text-gray-800 text-3xl text-center border-b border-gray-600 mb-4">
        Mis Propiedades
      </p>

      {properties
        .filter((property) => property.id_user === user.id_user)
        .map((property, index) => (
          <div
            key={property.id_property}
            className={`rounded-md overflow-hidden shadow-md mb-4 ${
              index > 0 ? "border-t border-gray-300 pt-4" : ""
            } bg-gray-300 bg-opacity-50 rounded-lg `}
            style={{ maxWidth: "1000px", minWidth: "300px" }}
          >
            <div className="flex p-6">
              <div className="w-1/3">
                <div className="person-image-container">
                  <div className="person-image">
                    <img
                      src={`${property.images[0]}`}
                      alt="Avatar"
                      className="object-cover w-full h-50 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="w-3/4 p-8">
                <h4 className="text-xl text-gray-800 font-semibold">
                  {property.title}
                </h4>
                <p className="text-gray-800">{property.description}</p>
                <p className="mb-2">
                  Ambientes:{" "}
                  <span className="text-gray-500">{property.rooms}</span>
                </p>

                <p className="mb-2">
                  Precio:{" "}
                  <span style={{ fontWeight: "bold", color: "#555" }}>
                    ${property.price}
                  </span>
                </p>
                <p className="mb-2">Ubicación: {property.location.country}</p>
                <div className="text-center mt-4">
                  <button
                    onClick={() => handleEditClick(property)}
                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(property.id_property)}
                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

      {isEditing && propertyToEdit && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(propertyToEdit);
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
                  value={propertyToEdit.location.country}
                  onChange={(e) =>
                    setPropertyToEdit({
                      ...propertyToEdit,
                      location: e.target.value,
                    })
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
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setPropertyToEdit(null);
                  }}
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProperties;

// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// // eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";

// // eslint-disable-next-line react/prop-types
// function MyProperties({ properties }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [propertyToEdit, setPropertyToEdit] = useState(null);
//   const [propertyImages, setPropertyImages] = useState([]);

//   const deleteProperty = async (id_property) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/property/${id_property}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//     console.log(response);
//         Swal.fire({
//           title: "Éxito",
//           text: "El inmueble se ha eliminado correctamente",
//           icon: "success",
//         }).then((result) => {
//           if (result.isConfirmed) {
//             location.reload();
//           }
//         });
//       } else {

//         Swal.fire({
//           title: "Error",
//           text: "Error al eliminar el inmueble",
//           icon: "error",
//         });
//       }
//     } catch (error) {
//       console.error("Error al eliminar el inmueble:", error);
//     }
//   };

//   const handleEditClick = (property) => {
//     setIsEditing(true);
//     setPropertyToEdit(property);
//     setPropertyImages(property.images);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setPropertyToEdit(null);
//     setPropertyImages([]);
//   };

//   const handleFileSelect = (e) => {
//     const files = e.target.files;
//     const newImages = Array.from(files).map((file) =>
//       URL.createObjectURL(file)
//     );
//     setPropertyImages([...propertyImages, ...newImages]);
//   };

//   const handleRemoveImage = (index) => {
//     const newImages = [...propertyImages];
//     newImages.splice(index, 1);
//     setPropertyImages(newImages);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const files = e.dataTransfer.files;
//     const newImages = [...propertyImages];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const imageUrl = URL.createObjectURL(file);
//       newImages.push(imageUrl);
//     }

//     setPropertyImages(newImages);
//   };
// console.log("Propiedades recibidas:", properties);
//   const navigate = useNavigate();

//   const handleSaveChanges = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/property/${propertyToEdit.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(propertyToEdit),
//         }
//       );

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Cambios realizados con éxito",
//           showConfirmButton: false,
//           html: '<button id="continueButton" class="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Continuar</button>',
//           didOpen: () => {
//             document
//               .getElementById("continueButton")
//               .addEventListener("click", () => {
//                 setIsEditing(false);
//                 setPropertyToEdit(null);
//                 navigate("/user");
//               });
//           },
//         });
//       } else {
//         console.error("Error al modificar la propiedad.");
//       }
//     } catch (error) {
//       console.error("Error de red:", error);
//     }
//   };

//   return (
//     <div className="mt-20 bg-opacity-50 rounded-lg">
//       <p className="font-bold text-gray-800 text-3xl text-center border-b border-gray-600 mb-4">
//         Mis Propiedades
//       </p>

//       {properties.map((property, index) => (
//         <div
//           key={property.id_property}
//           className={`rounded-md overflow-hidden shadow-md mb-4 ${
//             index > 0 ? "border-t border-gray-300 pt-4" : ""
//           } bg-gray-300 bg-opacity-50 rounded-lg`}
//         >
//           <div className="flex p-6">
//             <div className="w-1/3">
//               <div className="person-image-container">
//                 <div className="person-image">
//                   <img
//                     src={`${property.images[0]}`}
//                     alt="Avatar"
//                     className="object-cover w-full h-50 rounded-lg"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="w-3/4 p-8">
//               <h4 className="text-xl text-gray-800 font-semibold">
//                 {property.title}
//               </h4>
//               <p className="text-gray-800">{property.description}</p>
//               <p className="mb-2">
//                 Ambientes: <span className="text-gray-500">{property.rooms}</span>
//               </p>

//               <p className="mb-2">
//                 Precio:{" "}
//                 <span style={{ fontWeight: "bold", color: "#555" }}>
//                   ${property.price}
//                 </span>
//               </p>
//               <p className="mb-2">Ubicación: {property.location}</p>
//               <div className="text-center mt-4">
//                 <button
//                   className="inline-block bg-gray-700 text-white my-10 py-2 px-6 rounded-full hover:bg-gray-800 mx-auto"
//                   onClick={() => handleEditClick(property)}
//                 >
//                   Modificar
//                 </button>
//                 <button
//                   className="inline-block ml-2 bg-gray-700 text-white py-2 px-6 rounded-full hover:bg-gray-800 mx-auto"
//                   onClick={() => deleteProperty(property.id)}
//                 >
//                   Eliminar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//       {isEditing && propertyToEdit && (

//         <form
//           onSubmit={handleSaveChanges}
//           encType="multipart/form-data"
//           className="flex items-center justify-center rounded-lg item-center shadow-md"
//         >
//           <div className="w-2/3 p-2  bg-white rounded-lg shadow-md ">
//             <div className="w-3/4 p-2 bg-white rounded-lg shadow-md mt-4">
//               <h2>Datos de la propiedad:</h2>
//               <div className="mb-2">
//                 <label
//                   htmlFor="title"
//                   className="block text-gray-800 font-bold mb-1"
//                 >
//                   Título:
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={propertyToEdit.title}
//                   onChange={(e) =>
//                     setPropertyToEdit({
//                       ...propertyToEdit,
//                       title: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//                   required
//                 />
//               </div>
//               <div className="mb-2">
//                 <label
//                   htmlFor="type"
//                   className="block text-gray-800 font-bold mb-1"
//                 >
//                   Tipo de Alquiler:
//                 </label>
//                 <select
//                   type="text"
//                   id="type"
//                   name="type"
//                   value={propertyToEdit.type}
//                   onChange={(e) =>
//                     setPropertyToEdit({
//                       ...propertyToEdit,
//                       type: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//                   required
//                 >
//                   <option value="">Seleccionar tipo de alquiler</option>
//                   <option value="Alquiler temporal">Alquiler temporal</option>
//                   <option value="Alquiler a largo plazo">
//                     Alquiler a largo plazo
//                   </option>
//                 </select>
//               </div>
//               <div className="mb-2">
//                 <label
//                   htmlFor="location"
//                   className="block text-gray-800 font-bold mb-1"
//                 >
//                   Ubicacion:
//                 </label>
//                 <input
//                   type="text"
//                   id="location"
//                   name="location"
//                   value={propertyToEdit.location}
//                   onChange={(e) =>
//                     setPropertyToEdit({
//                       ...propertyToEdit,
//                       location: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//                   required
//                 />
//               </div>
//               <div className="mb-2">
//                 <label
//                   htmlFor="rooms"
//                   className="block text-gray-800 font-bold mb-1"
//                 >
//                   Ambientes:
//                 </label>
//                 <input
//                   type="number"
//                   id="rooms"
//                   name="rooms"
//                   value={propertyToEdit.rooms}
//                   onChange={(e) =>
//                     setPropertyToEdit({
//                       ...propertyToEdit,
//                       rooms: parseInt(e.target.value),
//                     })
//                   }
//                   className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//                   required
//                 />
//               </div>
//               <div className="mb-2">
//                 <label
//                   htmlFor="description"
//                   className="block text-gray-800 font-bold mb-1"
//                 >
//                   Descripcion:
//                 </label>
//                 <textarea
//                   type="text"
//                   id="description"
//                   name="description"
//                   value={propertyToEdit.description}
//                   onChange={(e) =>
//                     setPropertyToEdit({
//                       ...propertyToEdit,
//                       description: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline h-auto resize-none block"
//                   required
//                 />
//               </div>
//               <div className="mb-2">
//                 <label
//                   htmlFor="price"
//                   className="block text-gray-800 font-bold mb-1"
//                 >
//                   Precio - $:
//                 </label>
//                 <input
//                   type="number"
//                   id="price"
//                   name="price"
//                   value={propertyToEdit.price}
//                   onChange={(e) =>
//                     setPropertyToEdit({
//                       ...propertyToEdit,
//                       price: parseInt(e.target.value),
//                     })
//                   }
//                   className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//                   required
//                 />
//               </div>
//               <div className="mb-2">
//                 <label
//                   htmlFor="imageUpload"
//                   className="block text-gray-800 font-bold mb-2"
//                 >
//                   Imágenes:
//                 </label>
//                 <div
//                   id="imageDropArea"
//                   className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:shadow-outline transition-colors ease-in-out duration-300 hover:bg-blue-200"
//                   onDragOver={(e) => handleDragOver(e)}
//                   onDrop={(e) => handleDrop(e)}
//                 >
//                   <label htmlFor="imageUpload">
//                     Arrastra y suelta imágenes aquí o haz clic para
//                     seleccionarlas.
//                   </label>
//                 </div>
//                 <input
//                   type="file"
//                   id="imageUpload"
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   onChange={(e) => handleFileSelect(e)}
//                 />
//               </div>
//               {propertyImages.length > 0 && (
//                 <div className="mb-2">
//                   <label className="block text-gray-800 font-bold mb-2">
//                     Imágenes cargadas:
//                   </label>
//                   <div className="flex flex-wrap">
//                     {propertyImages.map((imageUrl, index) => (
//                       <div key={index} className="relative w-1/4 p-2">
//                         <img
//                           src={imageUrl}
//                           alt={`Imagen ${index + 1}`}
//                           className="w-full h-auto rounded"
//                         />
//                         <button
//                           className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700 cursor-pointer"
//                           onClick={() => handleRemoveImage(index)}
//                         >
//                           <img
//                             src="../public/images/boton-x.png"
//                             alt="Eliminar"
//                             className="w-4 h-4"
//                           />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <div>
//                 <button
//                   onClick={handleSaveChanges}
//                   className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 >
//                   Enviar Cambios
//                 </button>
//                 <button
//                   onClick={handleCancelEdit}
//                   className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
//                 >
//                   Cancelar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>

//       )}
//     </div>
//   );
// }

// export default MyProperties;
