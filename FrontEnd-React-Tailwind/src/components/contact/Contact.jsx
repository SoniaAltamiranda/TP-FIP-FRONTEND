/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.message
    ) {
      setNotification({
        type: "error",
        message: "Todos los campos son obligatorios.",
      });
      return;
    }

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(formData.email)) {
      setNotification({
        type: "error",
        message: "Correo electrónico inválido.",
      });
      return;
    }

    const namePattern = /^[A-Za-z]+$/;
    if (
      !namePattern.test(formData.firstName) ||
      !namePattern.test(formData.lastName)
    ) {
      setNotification({
        type: "error",
        message: "Nombre y apellido solo pueden contener letras.",
      });
      return;
    }

    const phonePattern = /^\d+$/;
    if (!phonePattern.test(formData.phoneNumber)) {
      setNotification({
        type: "error",
        message: "Número de teléfono solo puede contener números.",
      });
      return;
    }

    setTimeout(() => {
      setNotification({
        type: "success",
        message: "¡Tu consulta se ha enviado exitosamente!",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });

      setTimeout(() => {
        setNotification({ type: "", message: "" });
      }, 2000);
    }, 5000);
  };

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setNotification({ type: "", message: "" });
    }, 2000);

    return () => {
      clearTimeout(notificationTimeout);
    };
  }, [notification]);

  return (
    <div
      id="contact"
      className="w-1/4 mx-auto p-4 flex flex-col" style={{ width: '70%' }}
    >
      <div
        id="contact-page"
        className="border-2 border-gray-300 p-2 rounded-md shadow-md w-full flex"
      >
        <div id="contact-content" className="w-1/2 p-2 flex flex-col" style={{ width: '50%' }}>
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
            Escribe tu mensaje y nos pondremos en contacto contigo pronto.
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
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium"
              >
                Teléfono:
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
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
                className="w-full bg-gray-700 text-white py-2 rounded-md hover-bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
        <div
          id="contact-image"
          className="w-1/2"
          style={{
            backgroundImage: `url("https://cdn.pixabay.com/photo/2015/02/02/11/08/office-620817_1280.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "95vh",
            flex: "1",
            position: "relative",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Contact;
