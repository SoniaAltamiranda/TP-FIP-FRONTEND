import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import API_URL from '../../configAPIclever/Url_apiClever';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const payload = jwtDecode(token);
  
        const response = await fetch(
          `${API_URL}/user/${payload.sub}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }
  
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        message: "",
      });
    }
  }, [userData]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { firstName, lastName, email, message } = formData;
  
      const mailtoLink = `mailto:${email}?subject=Consulta&body=${encodeURIComponent(message)}`;
  
      window.location.href = mailtoLink;
  
      setNotification({
        type: "success",
        message: "¡Tu consulta se ha enviado exitosamente!",
      });
  
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setNotification({
        type: "error",
        message: "Hubo un problema al enviar la consulta. Por favor, inténtalo nuevamente.",
      });
    }
  };
  
  useEffect(() => {
    // Limpiar la notificación después de 2 segundos
    const notificationTimeout = setTimeout(() => {
      setNotification({ type: "", message: "" });
    }, 2000);

    return () => {
      clearTimeout(notificationTimeout);
    };
  }, [notification]); // Se ejecutará cada vez que cambie notification

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
    onClick={handleSubmit}
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
