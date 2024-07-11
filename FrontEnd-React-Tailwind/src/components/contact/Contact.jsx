import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import API_URL from '../../configAPIclever/Url_apiClever';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  const [userData, setUserData] = useState(null); // Aquí se almacenará la información del usuario autenticado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtiene el token JWT del almacenamiento local
        const payload = jwtDecode(token); // Decodifica el token JWT para obtener los datos del usuario

        const response = await fetch(
          `${API_URL}/user/${payload.sub}`, // Endpoint para obtener los datos del usuario
          {
            headers: {
              Authorization: `Bearer ${token}`, // Incluye el token JWT en la cabecera de autorización
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json(); // Convierte la respuesta a JSON
        setUserData(data); // Almacena los datos del usuario en el estado
        setLoading(false); // Cambia el estado de carga a false
      } catch (error) {
        console.error("Error:", error); // Manejo de errores
        setLoading(false); // Cambia el estado de carga a false
      }
    };

    fetchUserData(); // Llama a la función para obtener los datos del usuario al cargar el componente
  }, []);

  useEffect(() => {
    // Cuando se obtengan los datos del usuario, prellenar automáticamente los campos del formulario
    if (userData) {
      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: "", // Puedes decidir si prellenar el número de teléfono si está disponible
        message: "",
      });
    }
  }, [userData]); // Se ejecutará cada vez que cambie userData

  useEffect(() => {
    
    const publicKey = "6C5rvWwadEnRo92Kq"; 
    emailjs.init(publicKey);

  
    const notificationTimeout = setTimeout(() => {
      setNotification({ type: "", message: "" });
    }, 2000);

    return () => {
      clearTimeout(notificationTimeout);
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_yxt99lh"; // Reemplaza con tu service ID de EmailJS
    const templateId = "template_3lq9a3o"; // Reemplaza con tu template ID de EmailJS

    emailjs.sendForm(serviceId, templateId, e.target)
      .then((result) => {
        console.log(result.text);
        setNotification({
          type: 'success',
          message: '¡Tu consulta se ha enviado exitosamente!',
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          message: '',
        });
      }, (error) => {
        console.error(error.text);
        setNotification({
          type: 'error',
          message: 'Hubo un problema al enviar la consulta. Por favor, inténtalo nuevamente.',
        });
      });
  };

  return (
    <div
      id="contact"
      className="w-full mx-auto p-10 flex flex-col mt-20"
      style={{ maxWidth: '800px' }}
    >
      <div
        id="contact-page"
        className="border-2 border-gray-300 p-2 rounded-md shadow-md w-full flex flex-col md:flex-row"
      >
        <div id="contact-content" className="w-full md:w-1/2 p-2 flex flex-col">
          {notification.type === "success" && (
            <div className="message success-message text-center">
              {notification.message}
            </div>
          )}
          {notification.type === "error" && (
            <div className="message error-message text-center">
              {notification.message}
            </div>
          )}

          <h1 className="text-xl font-semibold text-center mb-4">
            Contáctanos
          </h1>
          <p className="text-gray-700">
            Escribe tu mensaje y nos pondremos en contacto contigo.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="firstName" className="block text-sm font-medium">
                Nombre:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium">
                Apellido:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Correo electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium">
                Consulta:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-4 flex justify-center">
              <button
                type="submit"
                className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
        <div
          id="contact-image"
          className="w-full md:w-1/2"
          style={{
            backgroundImage: `url("https://cdn.pixabay.com/photo/2015/02/02/11/08/office-620817_1280.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px", // Ajusta la altura según sea necesario
            flex: "1",
            position: "relative",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Contact;
