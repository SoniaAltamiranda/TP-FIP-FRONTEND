import React, { useState, useEffect } from 'react';
import "./Contact.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [notification, setNotification] = useState({
    type: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber || !formData.message) {
      setNotification({ type: 'error', message: 'Todos los campos son obligatorios.' });
      return;
    }

    
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(formData.email)) {
      setNotification({ type: 'error', message: 'Correo electrónico inválido.' });
      return;
    }

    
    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(formData.firstName) || !namePattern.test(formData.lastName)) {
      setNotification({ type: 'error', message: 'Nombre y apellido solo pueden contener letras.' });
      return;
    }

    
    const phonePattern = /^\d+$/;
    if (!phonePattern.test(formData.phoneNumber)) {
      setNotification({ type: 'error', message: 'Número de teléfono solo puede contener números.' });
      return;
    }

    
    setTimeout(() => {
      setNotification({ type: 'success', message: '¡Tu consulta se ha enviado exitosamente!' });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });

      
      setTimeout(() => {
        setNotification({ type: '', message: '' }); 
      }, 2000);
    }, 5000);
  };

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setNotification({ type: '', message: '' });
    }, 2000);

    return () => {
      clearTimeout(notificationTimeout);
    };
  }, [notification]);

  return (
    <div id="contact">
      <div id="contact-page">
        {notification.type === 'success' && (
          <div className="message success-message">{notification.message}</div>
        )}
        {notification.type === 'error' && (
          <div className="message error-message">{notification.message}</div>
        )}

        <div id="contact-content">
          <h1>Contáctanos</h1>
          <p>Escribe tu mensaje y nos pondremos en contacto contigo pronto.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">Nombre:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Apellido:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Teléfono:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message">Consulta:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
      
      <div id="contact-image"></div>

    </div>
  );
}

export default ContactForm;

