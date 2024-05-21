// import { useState } from "react";
// import Swal from 'sweetalert2';

// function ModifyProperty() {
//   const [id, setId] = useState("");
//   const [property, setProperty] = useState(null);
//   const [isPropertyFound, setIsPropertyFound] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isError, setIsError] = useState(false);

//   const fetchPropertyById = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/property/${id}`);
  
//       if (response.ok) {
//         const data = await response.json();
//         setProperty(data);
//         setIsPropertyFound(true);
//         setIsSuccess(false);
//         setIsError(false);
//       } else {
//         console.error("Error al obtener la propiedad por ID");
//         setProperty(null);
//         setIsPropertyFound(false);
//         setIsError(true);
  
//         // Mostrar el SweetAlert
//         Swal.fire({
//           icon: 'error',
//           title: 'Propiedad no encontrada',
//           text: 'La propiedad con el ID indicado no existe.',
//           showCancelButton: true,
//           confirmButtonText: 'Reintentar',
//           cancelButtonText: 'Salir',
//         }).then((result) => {
//           if (result.isConfirmed) {
//             //Reintentar
//           } else if (result.isDismissed) {
//             window.location.href = "http://localhost:5173/user";
//           }
//         });
//       }
//     } catch (error) {
//       console.error("Error al obtener la propiedad por ID:", error);
//       setProperty(null);
//       setIsPropertyFound(false);
//       setIsError(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { value } = e.target;
//     setId(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     fetchPropertyById();
//   };

//   const handleSaveChanges = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/properties/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(property),
//       });

//       if (response.ok) {
//         console.log("La propiedad se modificó con éxito.");
//         setIsSuccess(true);
//         setIsError(false);

//         // Mostrar el SweetAlert de éxito
//         Swal.fire({
//           icon: 'success',
//           title: 'Cambios realizados con éxito',
//           showConfirmButton: false,
//           html: '<button id="continueButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Continuar</button>',
//           didOpen: () => {
//             document.getElementById('continueButton').addEventListener('click', () => {
//               window.location.href = "http://localhost:5173/user";
//             });
//           },
//         });
//       } else {
//         console.error("Error al modificar la propiedad.");
//         setIsError(true);
//         setIsSuccess(false);
//       }
//     } catch (error) {
//       console.error("Error de red:", error);
//       setIsError(true);
//       setIsSuccess(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="w-3/4 p-2 bg-white rounded-lg shadow-md">
//         <h1>Indique el ID del inmueble que desea editar:</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-2">
//             <label htmlFor="id" className="block text-gray-800 font-bold mb-1">
//               ID del Inmueble:
//             </label>
//             <input
//               type="text"
//               id="id"
//               name="id"
//               value={id}
//               onChange={handleInputChange}
//               className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Buscar Propiedad
//             </button>
//           </div>
//         </form>
//       </div>
//       {isPropertyFound && property && (
//         <div className="w-3/4 p-2 bg-white rounded-lg shadow-md mt-4">
//           <h2>Datos de la propiedad:</h2>
//           <div className="mb-2">
//             <label
//               htmlFor="title"
//               className="block text-gray-800 font-bold mb-1"
//             >
//               Título:
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={property.title}
//               onChange={(e) =>
//                 setProperty({ ...property, title: e.target.value })
//               }
//               className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label
//               htmlFor="type"
//               className="block text-gray-800 font-bold mb-1"
//             >
//               Tipo de Alquiler:
//             </label>
//             <input
//               type="text"
//               id="type"
//               name="type"
//               value={property.type}
//               onChange={(e) =>
//                 setProperty({ ...property, type: e.target.value })
//               }
//               className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label
//               htmlFor="rooms"
//               className="block text-gray-800 font-bold mb-1"
//             >
//               Ambientes:
//             </label>
//             <input
//               type="number"
//               id="rooms"
//               name="rooms"
//               value={property.rooms}
//               onChange={(e) =>
//                 setProperty({ ...property, rooms: parseInt(e.target.value) })
//               }
//               className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label
//               htmlFor="description"
//               className="block text-gray-800 font-bold mb-1"
//             >
//               Descripcion:
//             </label>
//             <input
//               type="text"
//               id="description"
//               name="description"
//               value={property.description}
//               onChange={(e) =>
//                 setProperty({ ...property, description: e.target.value })
//               }
//               className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label
//               htmlFor="price"
//               className="block text-gray-800 font-bold mb-1"
//             >
//               Precio:
//             </label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={property.price}
//               onChange={(e) =>
//                 setProperty({ ...property, price: parseInt(e.target.value) })
//               }
//               className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label
//               htmlFor="images"
//               className="block text-gray-800 font-bold mb-1"
//             >
//               Imagenes:
//             </label>
//             <input
//               type="text"
//               id="images"
//               name="images"
//               value={property.images}
//               onChange={(e) =>
//                 setProperty({ ...property, images: e.target.value })
//               }
//               className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <button
//             onClick={handleSaveChanges}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Enviar Cambios
//           </button>
//           {isSuccess && <p>Los cambios se realizaron exitosamente.</p>}
//           {isError && <p>No se pudieron realizar los cambios.</p>}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ModifyProperty;
