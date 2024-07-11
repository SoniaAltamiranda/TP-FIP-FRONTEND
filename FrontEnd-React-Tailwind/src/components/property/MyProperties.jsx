
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
    const [showReservations, setShowReservations] = useState(false); 
    const propertiesPerPage = 3;

    useEffect(() => {
        async function fetchProperties() {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No se encontró el token de autenticación.");
                if (!user || !user.id_user) throw new Error("No se proporcionó un usuario válido.");
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
                const locationIds = [...new Set(propertiesData.map((property) => property.id_location))];
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
                if (!locationResponse.ok) throw new Error("Error al cargar las ubicaciones.");
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
            const response = await fetch(`${API_URL}/booking?propertyId=${propertyId}`);
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
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
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
                                    Ubicación: {property.location.city}, {property.location.state},{" "}
                                    {property.location.country}
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
                                                <div key={reservation.id_booking} className="flex items-center mb-2">
                                                    {new Date(reservation.date_init).toLocaleDateString()} -{" "}
                                                    {new Date(reservation.date_finish).toLocaleDateString()}
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
                {Array.from({ length: Math.ceil(properties.length / propertiesPerPage) }).map(
                    (_, index) => (
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
                    )
                )}
            </div>
        </div>
    );
}

export default MyProperties;
