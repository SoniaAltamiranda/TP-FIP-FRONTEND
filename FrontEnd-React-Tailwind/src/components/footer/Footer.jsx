import React from 'react';
import './Footer.css';

function Footer() {
  return (
    
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">¡Gracias por visitar nuestro sitio web!</p>
        <p className="text-sm">© 2023 Todos los derechos reservados</p>
      </div>
      <div className="footer-icons">
    <a href="https://www.facebook.com" className="icon-container">
        <i className="fab fa-facebook-f"></i>
    </a>
    <a href="https://www.instagram.com" className="icon-container">
        <i className="fab fa-instagram"></i>
    </a>
    <a href="https://www.tiktok.com" className="icon-container">
        <i className="fab fa-tiktok"></i>
    </a>
    <a href="https://www.twitter.com" className="icon-container">
        <i className="fab fa-twitter"></i>
    </a>
</div>
    </footer>
  );
}

export default Footer;


