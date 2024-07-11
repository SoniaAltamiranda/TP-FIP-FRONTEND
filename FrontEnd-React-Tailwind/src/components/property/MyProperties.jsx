import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [users, setUsers] = useState([]);

  const propertiesPerPage = 3;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token)
          throw new Error("No se encontró el token de autenticación.");

        const userId = user.id_user;
        const responseProperties = await fetch(
          `${API_URL}/property?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!responseProperties.ok)
          throw new Error("Error al cargar las propiedades.");
        const propertiesData = await responseProperties.json();
        setProperties(propertiesData);

        const locationIds = [
          ...new Set(propertiesData.map((property) => property.id_location)),
        ];
        const responseLocations = await fetch(
          `${API_URL}/location?ids=${locationIds.join(",")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!responseLocations.ok)
          throw new Error("Error al cargar las ubicaciones.");
        const locations = await responseLocations.json();
        setLocationsData(locations);

        const responseUsers = await fetch(`${API_URL}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!responseUsers.ok) throw new Error("Error al cargar los usuarios.");
        const usersData = await responseUsers.json();
        setUsers(usersData);

        // Obtener reservas
        const responseReservations = await fetch(`${API_URL}/booking`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!responseReservations.ok)
          throw new Error("Error al cargar las reservas.");
        const reservationsData = await responseReservations.json();
        setReservations(reservationsData);
      } catch (error) {
        console.error("Error en la carga de datos:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al cargar los datos. Por favor, inténtalo de nuevo más tarde.",
          icon: "error",
        });
      }
    }
    fetchData();
  }, [user]);

  const fetchReservations = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/booking?propertyId=${propertyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok)
        throw new Error("Fallo al obtener las reservas de la propiedad");
      const data = await response.json();
      setReservations(data);
      setShowModal(true); // Abrir el modal al obtener las reservas
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
  };

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setIsDeleting(true);
  };

  const clearSelectedReservation = () => {
    setSelectedReservation(null);
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
                  style={{ margin: "0 auto" }}
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
                    onClick={() => fetchReservations(property.id_property)}
                    className="text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 shadow-md hover:shadow-lg"
                  >
                    Ver Reservas
                  </button>
                </div>
                <div className="text-center md:text-left mt-4">
                  <button
                    onClick={() => handleEditClick(property)}
                    className="bg-gray-700 shadow-lg hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 md:w-1/3 rounded-lg shadow-lg">
            <h2 className="text-2xl text-gray-700 font-bold mb-4">Reservas</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                      Fecha de inicio
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                      Fecha de fin
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                      Apellido
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                      Correo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedReservation ? (
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {new Date(
                          selectedReservation.date_init
                        ).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {new Date(
                          selectedReservation.date_finish
                        ).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {
                          users.find(
                            (user) =>
                              user.id_user === selectedReservation.id_user
                          )?.name
                        }
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {
                          users.find(
                            (user) =>
                              user.id_user === selectedReservation.id_user
                          )?.lastname
                        }
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {
                          users.find(
                            (user) =>
                              user.id_user === selectedReservation.id_user
                          )?.email
                        }
                      </td>
                    </tr>
                  ) : (
                    reservations.map((reservation) => {
                      const user = users.find(
                        (user) => user.id_user === reservation.id_user
                      );
                      return (
                        <tr key={reservation.id_booking}>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {new Date(
                              reservation.date_init
                            ).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {new Date(
                              reservation.date_finish
                            ).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {user?.name}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {user?.lastname}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {user?.email}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <hr className="my-2" />
            <button
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                clearSelectedReservation();
                setShowModal(false);
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
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
