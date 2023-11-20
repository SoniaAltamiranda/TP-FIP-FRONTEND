import React from 'react';
import './aboutUs.css';
function AboutUs() {
    return (
        <div className=" w-full text-center  bg-gray-200 pt-32 pb-10 ">
            <h1 className="text-6xl text-gray-700 font-extrabold mb-2">ALQUILAFÁCIL.COM</h1>
            <hr className="w-1/4 border-t-2 border-gray-700 mx-auto mb-4" />
            <p className="text-lg text-gray-700 uppercase mb-10 font-bold">
                Te ofrecemos la forma más sencilla y conveniente de encontrar el lugar perfecto para vos.
            </p>
            <div className="pl-4 mx-auto max-w-screen-lg">
                <div className="mb-4 animate-slide-in-left-1 text-xl">
                    <div className="flex items-center">
                        <img className='w-12 mr-2' src="./public/images/cuadrado.png" alt="check" />
                        <p className="font-bold italic">Variedad de Opciones:</p>
                    </div>
                    <p>Explora una amplia gama de propiedades disponibles para alquilar.</p>
                </div>
                <div className="mb-4 animate-slide-in-right-1 text-xl">
                    <div className="flex items-center">
                        <img className='w-12 mr-2' src="./public/images/cuadrado.png" alt="check" />
                        <p className="font-bold italic">Proceso Rápido y Eficiente:</p>
                    </div>
                    <p className="mw-200">
                        Simplificamos el proceso de alquiler para que encuentres tu hogar ideal de manera eficiente y segura.
                    </p>
                </div>
                <div className="mb-4 animate-slide-in-left-2 text-xl">
                    <div className="flex items-center">
                        <img className='w-12 mr-2' src="./public/images/cuadrado.png" alt="check" />
                        <p className="font-bold italic">Facilidad de Uso:</p>
                    </div>
                    <p>
                        Navega por nuestra interfaz intuitiva y encontrá lo que necesitas, ahorrando tiempo y esfuerzo.
                    </p>
                </div>
                <div className="animate-slide-in-right-2 text-xl ">
                    <div className="flex items-center">
                        <img className='w-12 mr-2' src="./public/images/cuadrado.png" alt="check" />
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
