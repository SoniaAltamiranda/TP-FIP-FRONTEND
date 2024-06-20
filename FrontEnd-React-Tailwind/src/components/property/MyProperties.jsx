import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API_URL from "../../configAPIclever/Url_apiClever";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function MyProperties({ user }) {
  const [properties, setProperties] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationsData, setLocationsData] = useState([]);

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

        const locationIds = propertiesData.map(
          (property) => property.id_location
        );
        const locationsResponse = await fetch(
          `${API_URL}/location?ids=${locationIds.join(",")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!locationsResponse.ok)
          throw new Error("Error al cargar las ubicaciones.");
        const locations = await locationsResponse.json();
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
          const response = await fetch(`${API_URL}/property/${id_property}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setProperties(
              properties.filter(
                (property) => property.id_property !== id_property
              )
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

  const handleEditClick = (property) => {
    console.log("Propiedad a editar:", property);
    setPropertyToEdit(property);
    setSelectedLocation(property.id_location);
    console.log("Ubicación seleccionada:", property.id_location);
    setIsEditing(true);
  };

  console.log("Ubicación seleccionada en handleUpdate:", selectedLocation);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedProperty = {
        ...propertyToEdit,
        id_location: Number(selectedLocation),
        rooms: Number(propertyToEdit.rooms),
        price: Number(propertyToEdit.price),
      };

      console.log("Propiedad actualizada:", updatedProperty);

      const response = await fetch(
        `${API_URL}/property/${propertyToEdit.id_property}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProperty),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        setProperties(
          properties.map((prop) =>
            prop.id_property === propertyToEdit.id_property
              ? updatedProperty
              : prop
          )
        );
        Swal.fire({
          title: "Éxito",
          text: "La propiedad se ha actualizado correctamente",
          icon: "success",
        });
      } else {
        const responseData = await response.json();
        console.error(
          "Error en la respuesta:",
          response.status,
          response.statusText
        );
        console.error("Datos de la respuesta:", responseData);
        throw new Error("Error al actualizar la propiedad");
      }
    } catch (error) {
      console.error("Error al actualizar la propiedad:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al actualizar la propiedad. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-400 mt-90 bg-opacity-50 container mx-auto rounded-lg p-4 md:p-8 overflow-auto">
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
                Location: {property.location.city}, {property.location.state},{" "}
                {property.location.country}
                <p className="mb-2">
                  Tipo de Alquiler:{" "}
                  <span className="text-gray-500">
                    {property.type}
                    <option value="">Seleccionar tipo de alquiler</option>
                    <option value="Alquiler temporal">Alquiler temporal</option>
                    <option value="Alquiler a largo plazo">
                      Alquiler a largo plazo
                    </option>
                  </span>
                </p>
                <p className="mb-2">
                  Ambientes:{" "}
                  <span className="text-gray-500">{property.rooms}</span>
                </p>
                <div className="text-center mt-4">
                  <button
                    onClick={() => handleEditClick(property)}
                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-1" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(property.id_property)}
                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-1" />
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
              onSubmit={handleUpdate}
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
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-800 font-bold mb-1"
                >
                  Descripción:
                </label>
                <input
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
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div>
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
                      rooms: e.target.value,
                    })
                  }
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-gray-800 font-bold mb-1"
                >
                  Precio:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={propertyToEdit.price}
                  onChange={(e) =>
                    setPropertyToEdit({
                      ...propertyToEdit,
                      price: e.target.value,
                    })
                  }
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-gray-800 font-bold mb-1"
                >
                  Ubicación:
                </label>
                <select
                  id="location"
                  name="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="border border-gray-400 p-2 rounded w-full"
                >
                  {locationsData.map((location) => (
                    <option
                      key={location.id_location}
                      value={location.id_location}
                    >
                      {location.city}, {location.state}, {location.country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
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
