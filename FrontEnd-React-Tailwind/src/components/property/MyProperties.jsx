
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import API_URL from "../../configAPIclever/Url_apiClever";
import ModifyProperty from "./ModifyProperty";
import DeleteProperty from "./DeleteProperty";

function MyProperties({ user }) {
  const [properties, setProperties] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState({});
  const [propertyToDelete, setPropertyToDelete] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationsData, setLocationsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservations, setReservations] = useState([]);
  const [showReservations, setShowReservations] = useState(false);
  const propertiesPerPage = 3;

  useEffect(() => {
    async function fetchProperties() {
      try {
        const token = localStorage.getItem("token");
        if (!token)
          throw new Error("No se encontró el token de autenticación.");
        if (!user || !user.id_user)
          throw new Error("No se proporcionó un usuario válido.");
        const userId = user.id_user;
        const response = await fetch(`${API_URL}/property?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al cargar las propiedades.");
        const propertiesData = await response.json();
        setProperties(propertiesData);
        const locationIds = [
          ...new Set(propertiesData.map((property) => property.id_location)),
        ];
        const locationResponse = await fetch(
          `${API_URL}/location?ids=${locationIds.join(",")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!locationResponse.ok)
          throw new Error("Error al cargar las ubicaciones.");
        const locations = await locationResponse.json();
        setLocationsData(locations);
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

  const fetchReservations = async (propertyId) => {
    try {
      const response = await fetch(
        `${API_URL}/booking?propertyId=${propertyId}`
      );
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      } else {
        throw new Error("Fallo al obtener las reservas de la propiedad");
      }
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al obtener las reservas. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
      });
    }
  };

    const handleEditClick = (property) => {
        setPropertyToEdit(property);
        setSelectedLocation(property.id_location);
        setIsEditing(true);
        fetchReservations(property.id_property);
    };

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setIsDeleting(true);
  };

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-10 bg-opacity-50 container mx-auto rounded-lg p-4 md:p-8 overflow-auto">
      <p className="font-bold text-gray-800 text-3xl text-center border-b border-gray-600 mb-4">
        Mis Propiedades
      </p>
      {currentProperties.map((property) => (
        <div key={property.id_property} className="mb-6">
          <div className="bg-white shadow-md rounded-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 md:mr-4 mb-4 md:mb-0">
                <img
                  src={`${property.images[0]}`}
                  alt="Avatar"
                  className="object-cover w-full h-48 md:h-64 rounded-lg"
                />
              </div>
              <div className="md:w-2/3 p-4">
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
                <p className="mb-2">
                  Ubicación: {property.location.city}, {property.location.state}
                  , {property.location.country}
                </p>
                <p className="mb-2">
                  Tipo de alquiler:{" "}
                  <span className="text-gray-500">{property.type}</span>
                </p>
                <div className="mb-2">
                  <button
                    onClick={() => {
                      fetchReservations(property.id_property);
                      setShowReservations(!showReservations);
                    }}
                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                  >
                    {showReservations ? "Ocultar Reservas" : "Ver Reservas"}
                  </button>
                  {showReservations && (
                    <div className="mt-2">
                      {reservations.map((reservation) => (
                        <>
                          <div
                            key={reservation.id_booking}
                            className="flex items-center mb-2"
                          >
                            {new Date(
                              reservation.date_init
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                              reservation.date_finish
                            ).toLocaleDateString()}
                          </div>
                          <p>{reservation.id_user}</p>
                        </>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left mt-4">
                  <button
                    onClick={() => handleEditClick(property)}
                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-1" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(property)}
                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-1" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isEditing && (
        <ModifyProperty
          property={propertyToEdit}
          selectedLocation={selectedLocation}
          locationsData={locationsData}
          setIsEditing={setIsEditing}
        />
      )}

      {isDeleting && (
        <DeleteProperty
          property={propertyToDelete}
          setIsDeleting={setIsDeleting}
        />
      )}

      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(properties.length / propertiesPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`${
              currentPage === index + 1
                ? "bg-gray-900 text-white"
                : "bg-gray-300 text-gray-700"
            } font-bold py-2 px-4 rounded mx-1`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MyProperties;

// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEdit,
//   faTrash,
//   faCalendarTimes,
// } from "@fortawesome/free-solid-svg-icons";
// import API_URL from "../../configAPIclever/Url_apiClever";

// function MyProperties({ user }) {
//   const [properties, setProperties] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [propertyToEdit, setPropertyToEdit] = useState({});
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [locationsData, setLocationsData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [reservations, setReservations] = useState([]);
//   const propertiesPerPage = 3;

//   useEffect(() => {
//     async function fetchProperties() {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token)
//           throw new Error("No se encontró el token de autenticación.");
//         if (!user || !user.id_user)
//           throw new Error("No se proporcionó un usuario válido.");

//         const userId = user.id_user;

//         const response = await fetch(`${API_URL}/property?userId=${userId}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("Soy el user => ", userId);
//         if (!response.ok) throw new Error("Error al cargar las propiedades.");
//         const propertiesData = await response.json();
//         setProperties(propertiesData);

//         const locationIds = [
//           ...new Set(propertiesData.map((property) => property.id_location)),
//         ];
//         const locationsResponse = await fetch(
//           `${API_URL}/location?ids=${locationIds.join(",")}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!locationsResponse.ok)
//           throw new Error("Error al cargar las ubicaciones.");
//         const locations = await locationsResponse.json();
//         setLocationsData(locations);
//       } catch (error) {
//         console.error("Error al cargar las propiedades:", error);
//         Swal.fire({
//           title: "Error",
//           text: "Hubo un error al cargar las propiedades. Por favor, inténtalo de nuevo más tarde.",
//           icon: "error",
//         });
//       }
//     }

//     fetchProperties();
//   }, [user]);

//   const handleDelete = async (id_property) => {
//     Swal.fire({
//       title: "¿Estás seguro?",
//       text: "Esta acción no se puede deshacer.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Sí, eliminar",
//       cancelButtonText: "Cancelar",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const token = localStorage.getItem("token");
//           const response = await fetch(`${API_URL}/property/${id_property}`, {
//             method: "DELETE",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (response.ok) {
//             setProperties(
//               properties.filter(
//                 (property) => property.id_property !== id_property
//               )
//             );
//             Swal.fire({
//               title: "¡Propiedad Eliminada!",
//               text: "La propiedad ha sido eliminada exitosamente.",
//               icon: "success",
//             });
//           } else {
//             throw new Error("Error al eliminar la propiedad");
//           }
//         } catch (error) {
//           console.error("Error al eliminar la propiedad:", error);
//           Swal.fire({
//             title: "Error",
//             text: "Hubo un error al eliminar la propiedad. Por favor, inténtalo de nuevo más tarde.",
//             icon: "error",
//           });
//         }
//       }
//     });
//   };

//   const fetchReservations = async (propertyId) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/booking?propertyId=${propertyId}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         setReservations(data);
//       } else {
//         throw new Error("Fallo al obtener las reservas de la propiedad");
//       }
//     } catch (error) {
//       console.error("Error al obtener las reservas:", error);
//     }
//   };

//   const deleteReservation = async (reservationId) => {
//     try {
//       const response = await fetch(`${API_URL}/booking/${reservationId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.ok) {
//         const updatedReservations = reservations.filter(
//           (reservation) => reservation.id_booking !== reservationId
//         );
//         setReservations(updatedReservations);
//         Swal.fire({
//           title: "¡Reserva Eliminada!",
//           text: "La reserva ha sido eliminada exitosamente.",
//           icon: "success",
//         });
//       } else {
//         throw new Error("Fallo al eliminar la reserva");
//       }
//     } catch (error) {
//       console.error("Error al eliminar la reserva:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Hubo un error al eliminar la reserva. Por favor, inténtalo de nuevo más tarde.",
//         icon: "error",
//       });
//     }
//   };

//   const handleDeleteReservation = (reservationId) => {
//     Swal.fire({
//       title: "¿Estás seguro?",
//       text: "Esta acción eliminará permanentemente la reserva.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Sí, eliminar",
//       cancelButtonText: "Cancelar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteReservation(reservationId);
//       }
//     });
//   };

//   const handleEditClick = (property) => {
//     setPropertyToEdit(property);
//     setSelectedLocation(property.id_location);
//     setIsEditing(true);
//     fetchReservations(property.id_property);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const updatedProperty = {
//         ...propertyToEdit,
//         id_location: Number(selectedLocation),
//         rooms: Number(propertyToEdit.rooms),
//         price: Number(propertyToEdit.price),
//       };

//       const response = await fetch(
//         `${API_URL}/property/${propertyToEdit.id_property}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(updatedProperty),
//         }
//       );

//       if (response.ok) {
//         setIsEditing(false);
//         setProperties(
//           properties.map((prop) =>
//             prop.id_property === propertyToEdit.id_property
//               ? updatedProperty
//               : prop
//           )
//         );
//         Swal.fire({
//           title: "Éxito",
//           text: "La propiedad se ha actualizado correctamente",
//           icon: "success",
//         });
//       } else {
//         const responseData = await response.json();
//         console.error(
//           "Error en la respuesta:",
//           response.status,
//           response.statusText
//         );
//         console.error("Datos de la respuesta:", responseData);
//         throw new Error("Error al actualizar la propiedad");
//       }
//     } catch (error) {
//       console.error("Error al actualizar la propiedad:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Hubo un error al actualizar la propiedad. Por favor, inténtalo de nuevo más tarde.",
//         icon: "error",
//       });
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);

//     const imagePromises = files.map((file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();

//         reader.onload = (e) => {
//           resolve(e.target.result);
//         };

//         reader.onerror = (e) => {
//           reject(new Error("Error al leer la imagen."));
//         };

//         reader.readAsDataURL(file);
//       });
//     });

//     Promise.all(imagePromises)
//       .then((imagesDataUrls) => {
//         const updatedImages = [...propertyToEdit.images, ...imagesDataUrls];
//         setPropertyToEdit({
//           ...propertyToEdit,
//           images: updatedImages,
//         });
//       })
//       .catch((error) => {
//         console.error("Error al cargar las imágenes:", error);
//         Swal.fire({
//           title: "Error",
//           text:
//             "Hubo un error al cargar las imágenes. Por favor, inténtalo de nuevo más tarde.",
//           icon: "error",
//         });
//       });
//   };

// const handleRemoveImage = (index) => {
//   const updatedImages = [...propertyToEdit.images];
//   updatedImages.splice(index, 1);
//   setPropertyToEdit({
//     ...propertyToEdit,
//     images: updatedImages,
//   });
// };

//   const indexOfLastProperty = currentPage * propertiesPerPage;
//   const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
//   const currentProperties = properties.slice(
//     indexOfFirstProperty,
//     indexOfLastProperty
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="mt-10 bg-opacity-50 container mx-auto rounded-lg p-4 md:p-8 overflow-auto">
//       <p className="font-bold text-gray-800 text-3xl text-center border-b border-gray-600 mb-4">
//         Mis Propiedades
//       </p>
//       {properties.length === 0 && (
//         <p className="text-center text-gray-500">
//           No tienes propiedades publicadas.
//         </p>
//       )}

//       {currentProperties
//         .filter((property) => property.id_user === user.id_user)
//         .map((property, index) => (
//           <div key={property.id_property} className="mb-6">
//             <div className="bg-white shadow-md rounded-lg">
//               <div className="flex flex-col md:flex-row">
//                 <div className="md:w-1/3 md:mr-4 mb-4 md:mb-0">
//                   <img
//                     src={`${property.images[0]}`}
//                     alt="Avatar"
//                     className="object-cover w-full h-48 md:h-64 rounded-lg"
//                   />
//                 </div>
//                 <div className="md:w-2/3 p-4">
//                   <h4 className="text-xl text-gray-800 font-semibold">
//                     {property.title}
//                   </h4>
//                   <p className="text-gray-800">{property.description}</p>
//                   <p className="mb-2">
//                     Ambientes:{" "}
//                     <span className="text-gray-500">{property.rooms}</span>
//                   </p>
//                   <p className="mb-2">
//                     Precio:{" "}
//                     <span style={{ fontWeight: "bold", color: "#555" }}>
//                       ${property.price}
//                     </span>
//                   </p>
//                   <p className="mb-2">
//                     Ubicación: {property.location.city},{" "}
//                     {property.location.state}, {property.location.country}
//                   </p>
//                   <p className="mb-2">
//                     Tipo de Alquiler:{" "}
//                     <span className="text-gray-500">{property.type}</span>
//                   </p>
//                   <p className="mb-2">
//                     Fechas Reservadas:{" "}
//                     <span className="text-gray-500">
//                       {reservations.map((reservation) => (
//                         <span
//                           key={reservation.id_booking}
//                           className="flex items-center mb-2"
//                         >
//                           {new Date(reservation.date_init).toLocaleDateString()}{" "}
//                           -{" "}
//                           {new Date(
//                             reservation.date_finish
//                           ).toLocaleDateString()}
//                           <button
//                             onClick={() =>
//                               handleDeleteReservation(reservation.id_booking)
//                             }
//                             className="ml-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200"
//                           >
//                             <FontAwesomeIcon
//                               icon={faCalendarTimes}
//                               className="mr-1"
//                             />
//                             Eliminar
//                           </button>
//                         </span>
//                       ))}
//                     </span>
//                   </p>
//                   <div className="text-center md:text-left mt-4">
//                     <button
//                       onClick={() => handleEditClick(property)}
//                       className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
//                     >
//                       <FontAwesomeIcon icon={faEdit} className="mr-1" />
//                       Editar
//                     </button>
//                     <button
//                       onClick={() => handleDelete(property.id_property)}
//                       className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
//                     >
//                       <FontAwesomeIcon icon={faTrash} className="mr-1" />
//                       Eliminar
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

//       {isEditing && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
//             <form onSubmit={handleUpdate} className="space-y-4">
//               <h2 className="text-2xl font-bold">Datos de la propiedad:</h2>
//               <div>
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
//                   className="border border-gray-400 p-2 rounded w-full"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="description"
//                   className="block text-gray-800 font-bold mb-1"
//                 >
//                   Descripción:
//                 </label>
//                 <input
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
//                   className="border border-gray-400 p-2 rounded w-full"
//                 />
//               </div>
//               <div>
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
//                       rooms: e.target.value,
//                     })
//                   }
//                   className="border border-gray-400 p-2 rounded w-full"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="type"
//                   className="block text-gray-800 font-bold mb-1"
//                 >
//                   Tipo de Alquiler:
//                 </label>
//                 <select
//                   id="type"
//                   name="type"
//                   value={propertyToEdit.type}
//                   onChange={(e) =>
//                     setPropertyToEdit({
//                       ...propertyToEdit,
//                       type: e.target.value,
//                     })
//                   }
//                   className="border border-gray-400 p-2 rounded w-full"
//                 >
//                   <option value="Alquiler temporal">Alquiler temporal</option>
//                   <option value="Alquiler permanente">
//                     Alquiler permanente
//                   </option>
//                 </select>
//               </div>

//               <div>
//                 <label
//                   htmlFor="price"
//                   className="block text-gray-800 font-bold mb-1"
//                 >
//                   Precio:
//                 </label>
//                 <input
//                   type="number"
//                   id="price"
//                   name="price"
//                   value={propertyToEdit.price}
//                   onChange={(e) =>
//                     setPropertyToEdit({
//                       ...propertyToEdit,
//                       price: e.target.value,
//                     })
//                   }
//                   className="border border-gray-400 p-2 rounded w-full"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="location"
//                   className="block text-gray-800 font-bold mb-1"
//                 >
//                   Ubicación:
//                 </label>
//                 <select
//                   id="location"
//                   name="location"
//                   value={selectedLocation}
//                   onChange={(e) => setSelectedLocation(e.target.value)}
//                   className="border border-gray-400 p-2 rounded w-full"
//                 >
//                   {locationsData.map((location) => (
//                     <option
//                       key={location.id_location}
//                       value={location.id_location}
//                     >
//                       {location.city}, {location.state}, {location.country}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label
//                   htmlFor="images"
//                   className="block text-gray-800 font-bold mb-1"
//                 >
//                   Imágenes:
//                 </label>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {propertyToEdit.images.map((image, index) => (
//                     <div key={index} className="relative">
//                       <img
//                         src={image}
//                         alt={`Image ${index}`}
//                         className="max-w-18 h-auto mb-2 rounded-lg"
//                         style={{ maxWidth: "100px", maxHeight: "100px" }}
//                       />
//                       <button
//                         onClick={() => handleRemoveImage(index)}
//                         className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//                       >
//                         X
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <input
//                   type="file"
//                   id="images"
//                   name="images"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageChange}
//                   className="border border-gray-400 p-2 rounded w-full"
//                 />
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
//                 >
//                   Guardar
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Cancelar
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center items-center mt-4">
//         {currentPage > 1 && (
//           <button
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//             onClick={() => paginate(currentPage - 1)}
//           >
//             {"< "}
//           </button>
//         )}
//         {currentPage < Math.ceil(properties.length / propertiesPerPage) && (
//           <button
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//             onClick={() => paginate(currentPage + 1)}
//           >
//             {" >"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyProperties;
