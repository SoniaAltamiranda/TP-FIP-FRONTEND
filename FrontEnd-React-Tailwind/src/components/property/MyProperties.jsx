import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function MyProperties({ properties }) {

  const deleteProperty = async (propertyId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/properties/${propertyId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Mostrar una alerta SweetAlert de éxito
        Swal.fire({
          title: "Éxito",
          text: "El inmueble se ha eliminado correctamente",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } else {
        // Mostrar una alerta SweetAlert de error
        Swal.fire({
          title: "Error",
          text: "Error al eliminar el inmueble",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error al eliminar el inmueble:", error);
    }
  };

  return (
    <div className="mt-16">
      <p className="font-bold text-3xl text-center underline mb-4">Mis Propiedades</p>
      {properties.map((property, index) => (
  <div key={property.id} className={`flex p-4 ${index > 0 ? 'border-t border-gray-300 pt-4' : ''}`}>
    <div className="w-1/4">
      <div className="person-image-container">
        <div className="person-image">
          <img
            src={`${property.images[0]}`}
            alt="Avatar"
            className="object-cover w-full h-40"
          />
        </div>
      </div>
    </div>
    <div className="w-3/4 p-4">
      <h4 className="text-xl font-semibold">{property.title}</h4>
      <p className="text-black-600">{property.description}</p>
      <div className="text-center mt-4">
        <Link
          to={`/rentals/${property.id}`}
          state={{ property }}
          className="inline-block bg-blue-500 text-white my-2 py-2 px-4 rounded-full hover-bg-blue-700 mx-auto"
        >
          Modificar
        </Link>
        <button
          className="inline-block ml-2 bg-red-500 text-white py-2 px-4 rounded-full hover-bg-blue-700 mx-auto"
          onClick={() => deleteProperty(property.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
))}
    </div>
  );
}

export default MyProperties;
