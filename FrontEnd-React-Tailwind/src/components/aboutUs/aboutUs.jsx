import React from 'react';
import './aboutUs.css';

function AboutUs() {
    return (
        <div className="w-full text-center bg-gray-200 pt-16 pb-10 sm:pt-24 lg:pt-32">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-700 font-extrabold mt-10 mb-2">ALQUILAFÁCIL.COM</h1>
            <hr className="w-1/2 sm:w-1/3 lg:w-1/4 border-t-2 border-gray-700 mx-auto mb-4" />
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 uppercase mb-6 lg:mb-10 font-bold">
                Te ofrecemos la forma más sencilla y conveniente de encontrar el lugar perfecto para vos.
            </p>
            <div className="px-4 mx-auto max-w-screen-lg">
                <div className="mb-6 sm:mb-8 lg:mb-10 animate-slide-in-left-1 text-base sm:text-lg lg:text-xl">
                    <div className="flex items-center">
                        <img className="w-8 sm:w-10 lg:w-12 mr-2" src="/images/cuadrado.png" alt="check" />
                        <p className="font-bold italic">Variedad de Opciones:</p>
                    </div>
                    <p>Explora una amplia gama de propiedades disponibles para alquilar.</p>
                </div>
                <div className="mb-6 sm:mb-8 lg:mb-10 animate-slide-in-right-1 text-base sm:text-lg lg:text-xl">
                    <div className="flex items-center">
                        <img className="w-8 sm:w-10 lg:w-12 mr-2" src="/images/cuadrado.png" alt="check" />
                        <p className="font-bold italic">Proceso Rápido y Eficiente:</p>
                    </div>
                    <p>
                        Simplificamos el proceso de alquiler para que encuentres tu hogar ideal de manera eficiente y segura.
                    </p>
                </div>
                <div className="mb-6 sm:mb-8 lg:mb-10 animate-slide-in-left-2 text-base sm:text-lg lg:text-xl">
                    <div className="flex items-center">
                        <img className="w-8 sm:w-10 lg:w-12 mr-2" src="/images/cuadrado.png" alt="check" />
                        <p className="font-bold italic">Facilidad de Uso:</p>
                    </div>
                    <p>
                        Navega por nuestra interfaz intuitiva y encontrá lo que necesitas, ahorrando tiempo y esfuerzo.
                    </p>
                </div>
                <div className="animate-slide-in-right-2 text-base sm:text-lg lg:text-xl">
                    <div className="flex items-center">
                        <img className="w-8 sm:w-10 lg:w-12 mr-2" src="/images/cuadrado.png" alt="check" />
                        <p className="font-bold italic">Transparencia:</p>
                    </div>
                    <p>
                        Ofrecemos información detallada sobre cada propiedad, incluyendo imágenes, para que tomes decisiones informadas.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;