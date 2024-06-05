import { useState } from "react";
 import Swal from "sweetalert2";

function DeleteProperty() {
  const [id, setId] = useState("");
  

const handleDelete = async (id_property) => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem("token");
            const response = await fetch(
              `http://localhost:3000/property/${id_property}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
  
            if (response.ok) {
              setProperties(
                properties.filter((property) => property.id !== id_property)
              );
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
  
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="w-3/4 p-2 bg-white rounded-lg shadow-md">
//         <h1>Indique el ID del inmueble para eliminarlo:</h1>
//         {showRetry ? (
//           <div>
//             <p className="text-red-500">{message}</p>
//             <button
//               onClick={handleRetry}
//               className="bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mr-2"
//             >
//               Reintentar
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             <div className="mb-2">
//               <label htmlFor="id" className="block text-gray-800 font-bold mb-1">
//                 ID del Inmueble:
//               </label>
//               <input
//                 type="text"
//                 id="id"
//                 name="id"
//                 value={id}
//                 onChange={(e) => setId(e.target.value)}
//                 className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>
//             <div className="text-center">
//               <button
//                 type="submit"
//                 className="bg-red-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Eliminar Inmueble por ID
//               </button>
//             </div>
//             {message && (
//               <div className="text-center mt-2 text-gray-800">{message}</div>
//             )}
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DeleteProperty;